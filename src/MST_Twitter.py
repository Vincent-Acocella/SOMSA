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

    AMOUNT_OF_PAGE_SCROLLS = 100
    TRENDS_TO_SCRAPE = 10

    def do_scroll(self, page_element, num_scrolls):
        for i in range(num_scrolls):
            page_element.send_keys(Keys.ARROW_DOWN)
            sleep(0.3)

    def get_comments(self, selection):
        for comment in selection.xpath('.//span/text()').getall():
            self.comment_chain += comment + " "


    def get_trend_comments(self, xpath):
        self.comment_chain = ""
        trend = self.driver.find_element_by_xpath(xpath)
        trend.click()
        sleep(1.8)
        interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
        self.do_scroll(interactable, self.AMOUNT_OF_PAGE_SCROLLS)
        
        select = Selector(text=self.driver.page_source)
        tweets = select.xpath('//div[@data-testid="tweet"]')
        print(tweets)
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
        self.current_home_url = 'https://twitter.com/explore/tabs/trending'
        self.driver.get(self.current_home_url)
        sleep(0.9)

        # Scroll downwards to load more trends before we select them all
        # We need something to focus on for scrolling
        interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
        for i in range(3):
            interactable.send_keys(Keys.PAGE_DOWN)
            sleep(0.5)
        for i in range(3):
            interactable.send_keys(Keys.PAGE_UP)

        select = Selector(text=self.driver.page_source)
        # Get trends on the page
        trends_selection = select.xpath('//div[@data-testid="trend"]')
        self.logger.info(trends_selection)
        #"//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div/section/div/div/div[6]"
        a = 0
        if a == 0:
            pass
        trends = trends_selection.getall()

        trend_path = '//div[@class="css-1dbjc4n"]'
        print(trends_selection)
        print(trends)
        for i in range(self.TRENDS_TO_SCRAPE):

            interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
            self.do_scroll(interactable, 3 * i)
            next_trend = trends[i]
            xpath = '//[@data-test'

            # At i = 0, this would be //div[@class="css_1dbjc4n"]/div/div[5]/div/div
            trend = trend_path + '/div/div[' + str(i + 5) + ']'
            trend_selection = select.xpath(trend_path + '/div/div[' + str(i + 5) + ']/div/div')
            span = trend_selection.xpath('.//span[@class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]/text()').getall()
            title = ""
            for p in range(2, len(span)):
                title += span[p] + " "

            self.get_trend_comments(trend)

            if len(self.comment_chain) > 0:
                yield {
                    title : self.comment_chain,
                    'Topic' : 'Hot Topics'
                }
            sleep(3.0)
            self.logger.info(self.comment_chain)
            self.driver.get(self.current_home_url)
            sleep(1.0)

        self.driver.close()
