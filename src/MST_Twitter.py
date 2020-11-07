"""

"""

import selenium
import scrapy
from scrapy import Spider
from scrapy.selector import Selector
from scrapy.http import Request

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep

class MSTTwitterSpider(Spider):

    name = "Twitter_Spider"
    # Placeholder url, the real url we want to visit will be called on creation of the webdriver
    start_urls = ('http://example.com/',)
    # This is where we will store comments for every reddit page
    # The key used represents what topic(s) they belong to
    comments = {}
    comment_chain = ""

    current_home_url = 'http://example.com/'

    AMOUNT_OF_PAGE_SCROLLS = 20

    def do_scroll(self, page_element, num_scrolls):
        for i in range(num_scrolls):
            page_element.send_keys(Keys.ARROW_DOWN)
            sleep(0.3)

    def get_comments(self, selection):
       # self.logger.info(selection.xpath('//p/text()').getall())
        for comment in selection.xpath('//span/text()').getall():
           # self.logger.info(comment)
            #self.comments[key].append(comment)
            interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
            self.comment_chain += comment + " "


    def get_trend_comments(self, xpath):
        self.comment_chain = ""
        trend = self.driver.find_element_by_xpath(xpath)
        trend.click()
        sleep(1.8)
        interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
        self.do_scroll(interactable, self.AMOUNT_OF_PAGE_SCROLLS)
        
        select = Selector(text=self.driver.page_source)
        tweets = select.xpath('//div[@class="css-1dbjc4n"]')
        self.get_comments(tweets)


    def parse(self, response):
        self.header = {
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'}
        # Selenium options
        browser_options = Options()
        browser_options.add_argument('--disable-notifications')
        browser_options.add_argument("--incognito")
        browser_options.add_argument("--disable-extensions")
        browser_options.add_argument("--disable-gpu")
        browser_options.add_argument("--disable-infobars")
        browser_options.add_argument("--disable-web-security")
        browser_options.add_argument("--no-sandbox")
        # Take these options to be applied to the driver's capabilities when it's created
        caps = browser_options.to_capabilities()
        # Location of the webdriver on your system
        self.driver = webdriver.Chrome('C:/ChromeDriver/chromedriver.exe', desired_capabilities=caps)
        self.current_home_url = 'https://twitter.com/explore'
        self.driver.get(self.current_home_url)
        sleep(0.9)

        select = Selector(text=self.driver.page_source)
        # Get trends on the page
        trends_selection = select.xpath('//div[@class="css-1dbjc4n"]/div/div[5]/div/@data-testid')
        trends_selection = select.xpath('//div[@data-testid="trend"]/@class')
        trends = trends_selection.getall()
        #//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/section/div/div/div[6]/div/div
        trend_path = '//div[@class="css-1dbjc4n"]'
        print(trends_selection)
        print(trends)
        for i in range(3):
            #interactable = self.driver.find_element_by_xpath('//*[@class="class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1habvwh r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-1ag2gil r-13qz1uu""]')
            interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
            self.do_scroll(interactable, 5 * i)
            next_trend = trends[i]
            xpath = '//[@data-test'
            #trend = self.driver.find_element_by_xpath('//div[@class="' + next_trend + '"]/div[' + str(i) + ']')
            trend = trend_path + '/div/div[' + str(i + 6) + ']/div/div'

            #select = select.xpath('//div[@class="css-1dbjc4n"]')
            self.get_trend_comments(trend)
           # self.logger.info(select.xpath('//*[@data-testid="tweet"]/@span').get())
           # self.logger.info(select.xpath('//div[@class="css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"]').get())
           # self.logger.info(select.xpath('//span[@class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]').getall())
            if len(self.comment_chain) > 0:
                yield {
                    'Test' : self.comment_chain
                }
            sleep(3.0)
            self.logger.info(self.comment_chain)
            self.driver.get(self.current_home_url)
            sleep(1.0)

        self.driver.close()
