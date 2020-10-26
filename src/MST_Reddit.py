"""
Testing usage of Selenium to access Reddit

"""

import selenium
import scrapy
from scrapy import Spider
from scrapy.selector import Selector
from scrapy.http import Request

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep


class MSTRedditSpider(Spider):

    name = "Reddit_Spider"
    # Placeholder url, the real url we want to visit will be called on creation of the webdriver
    start_urls = ('http://example.com/',)
    # This is where we will store comments for every reddit page
    # The key used represents what topic(s) they belong to
    comments = {}

    AMOUNT_OF_PAGE_SCROLLS = 20

    def do_comment_scroll(self, page_element):
        for i in range(self.AMOUNT_OF_PAGE_SCROLLS):
            page_element.send_keys(Keys.ARROW_DOWN)
            sleep(0.3)

    def get_comments(self, selection, key):
       # self.logger.info(selection.xpath('//p/text()').getall())
        for comment in selection.xpath('//p/text()').getall():
           # self.logger.info(comment)
            self.comments[key].append(comment)

    def reddit_thread_lookup(self, thread_xpath):
        # We want to clear the comments dictionary every run
        self.comments = {}
        self.logger.info("THREAD LOOKUP " + thread_xpath)
        post = self.driver.find_element_by_xpath(thread_xpath)
        post.click()
        # Give the page some time to load
        sleep(4.7)

        view_comments_button = self.driver.find_element_by_xpath(
            '//*[@class="j9NixHqtN2j8SKHcdJ0om _2JBsHFobuapzGwpHQjrDlD _2nelDm85zKKmuD94NequP0"]')
        select = Selector(text=self.driver.page_source)
        # The xpath as the key is TEMPORARY, will be changed to the thread title
        self.comments[thread_xpath] = []

        comments_selector = select.xpath('//div[@class="_1ump7uMrSA43cqok14tPrG _1oTUrVtKJk1ue0r3fe31kJ"]')
        comments_selector = comments_selector.xpath('//*[@id="t1_ga2312g"]/div[2]/div[3]/div[2]')
        # self.get_comments(comments_selector, 0)
        login_button = self.driver.find_element_by_xpath(
            '//*[@class="_3fM1M9rFBqKwfG-KJLnxPY _1HunhFR-0b-AYs0WG9mU_P _2nelDm85zKKmuD94NequP0"]')

        for i in range(2):
            # self.driver.find_element_by_tag_name("body").send_keys(Keys.END)
            # _2GTMVdV2t3ka_zfkVHHo95
            # self.driver.find_element_by_xpath('//*[@class="_1k97Y32qzGNtuVGyt73TpR  wLV79_wV-ziNiWmf3Y7OV _2nelDm85zKKmuD94NequP0"]').send_keys(Keys.ARROW_DOWN)
            view_comments_button.send_keys(Keys.ARROW_DOWN)
            sleep(0.5)
            # view_comments_button.send_keys(Keys.PAGE_DOWN)
        self.logger.info("SCROLL")
        # self.driver.execute_script("window.scrollTo(467, 950);")

        view_comments_button.click()
        sleep(0.4)
        self.do_comment_scroll(login_button)
        select = Selector(text=self.driver.page_source)
        self.logger.info('WEBSCRAPER TEST, ' + str(select))

        comments_selector = select.xpath('//*[@class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"]')
        # self.logger.info(comments.xpath('//p/text()').getall())
        self.logger.info('COMMENT, ' + str(comments_selector[0]))
        self.logger.info("...")

        self.get_comments(comments_selector, thread_xpath)
        #yield can't be called within this method, most be done in parse
       # yield {
       #     'Trending - ' + thread_xpath: self.comments[thread_xpath],
       # }

        self.driver.get('https://www.reddit.com/r/worldnews/')
        sleep(4.0)


    def parse(self, response):
        self.header = {'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'}
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


        # Send the request to our target site
        self.driver.get('https://www.reddit.com/r/worldnews/')
        sleep(0.7)
        self.logger.info("CALLING reddit_thread_lookup")
        self.reddit_thread_lookup('//*[@class="_32pB7ODBwG3OSx1u_17g58"]')
        yield {
            'One' : self.comments['//*[@class="_32pB7ODBwG3OSx1u_17g58"]']
         }
        self.reddit_thread_lookup('//*[@class="_32pB7ODBwG3OSx1u_17g58"]')
        yield {
            'Two' : self.comments['//*[@class="_32pB7ODBwG3OSx1u_17g58"]']
        }
        self.logger.info("CALLED")



        self.driver.close()
