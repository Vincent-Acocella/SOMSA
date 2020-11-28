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
    name = "Lookup_Spider"
    # Placeholder url, the real url we want to visit will be called on creation of the webdriver
    start_urls = ('http://example.com/',)

    comments = []
    # A variable to concatenate every comment on a trend into a single chain
    comment_chain = ""

    # The url to return to when we are done scraping a trend
    current_home_url = 'http://example.com/'

    # How far down we will scroll down per trend
    AMOUNT_OF_PAGE_SCROLLS = 20
    trend_to_scrape = []

    def __init__(self, trend=None, *args, **kwargs):
        super(MSTTwitterSpider, self).__init__(*args, **kwargs)
       # self.trend_to_scrape = trend
        trend = trend.replace("_", " ")
        self.trend_to_scrape = trend.split(".")
    """
    do_scroll
    page_element: the Element to attach to so we may send keyboard input
    num_scrolls: the number of times to scroll
    """

    def do_scroll(self, page_element, num_scrolls):
        for i in range(num_scrolls):
            page_element.send_keys(Keys.PAGE_DOWN)
            sleep(0.3)

    """
    get_comments
    selection: the selection that contains the spans we want to get
    collections every span under selection into comment_chain
    """

    def get_comments(self, selection):
        for comment in selection.xpath('.//span/text()').getall():
            self.comment_chain += comment + " "

    """
    get_trend_commetns
    xpath: the xpath to the page went to visit
    visits the given page, then selects every tweet from which comments are collected from
    """

    def get_trend_comments(self, xpath, title):

        trend = self.driver.find_element_by_xpath(xpath)
        trend.send_keys(title)
        trend.send_keys(Keys.RETURN)
        # trend.click()
        sleep(1.8)
        interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
        self.do_scroll(interactable, self.AMOUNT_OF_PAGE_SCROLLS)

        select = Selector(text=self.driver.page_source)
        tweets = select.xpath('//div[@data-testid="tweet"]')
        print(tweets)
        self.get_comments(tweets)
        self.driver.get('https://twitter.com/explore/tabs/trending')
        sleep(0.9)

    """
    parse
    Scrapy function run when the spider is called to perform a webcrawl
    Crawl the trending page on Twitter
    """
    def parse(self, response):
        if self.trend_to_scrape is None:
            self.logger.info("ERROR: No arguments were passed to the spider. Aborting")
            return

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

        search_xpath = '//*[@data-testid="SearchBox_Search_Input"]'
        for t in self.trend_to_scrape:
            self.get_trend_comments(search_xpath, t)

            if len(self.comment_chain) > 0:
                yield {
                    t: [self.comment_chain, 'NONE']
                }
                self.comment_chain = ""

        self.driver.close()
