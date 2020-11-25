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


    comments = []
    # A variable to concatenate every comment on a trend into a single chain
    comment_chain = ""

    # The url to return to when we are done scraping a trend
    current_home_url = 'http://example.com/'

    # How far down we will scroll down per trend
    AMOUNT_OF_PAGE_SCROLLS = 10
    TRENDS_TO_SCRAPE = 5

    """
    do_scroll
    page_element: the Element to attach to so we may send keyboard input
    num_scrolls: the number of times to scroll
    """
    def do_scroll(self, page_element, num_scrolls):
        for i in range(num_scrolls):
            page_element.send_keys(Keys.ARROW_DOWN)
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
        #trend.click()
        sleep(1.8)
        interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
        self.do_scroll(interactable, self.AMOUNT_OF_PAGE_SCROLLS)
        
        select = Selector(text=self.driver.page_source)
        tweets = select.xpath('//div[@data-testid="tweet"]')
        print(tweets)
        self.get_comments(tweets)

    """
    parse
    Scrapy function run when the spider is called to perform a webcrawl
    Crawl the trending page on Twitter
    """
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

        trend_span = trends_selection.xpath('.//span/text()').getall()
        trend_topics = []
        trend_titles = []
        for i in range(len(trend_span)):
            try:
                # trends_span is organized as so
                # The trend number
                # Unicode \u2592
                # The trend's topic
                # The trend title
                # The trend description should it exist
                # The amount of tweets should it exist
                # This logic will find each trend number, then grab the trend title and topic belonging to them
                a = int(trend_span[i])
                trend_topics.append(trend_span[i + 2])
                trend_titles.append(trend_span[i + 3])
            except ValueError:
                pass

        #print(trend_titles)
        #print(trend_topics)

        for i in range(self.TRENDS_TO_SCRAPE):
            interactable = self.driver.find_element_by_xpath('//*[@data-testid="AppTabBar_Explore_Link"]')
            self.do_scroll(interactable, 3 * i)

            title = trend_titles[i]
            topic = trend_topics[i]
            topic = topic.replace('\u00b7 Trending', '')
            topic = topic.strip()
            # Get the search bar. This is how we will get to each trend
            search_xpath = '//*[@data-testid="SearchBox_Search_Input"]'
            self.logger.info(title)

            if len(title) > 1:
                self.get_trend_comments(search_xpath, title)

            if len(self.comment_chain) > 0:
                yield {
                    title : [self.comment_chain, topic],
                    "Topic" : topic
                }
            self.comment_chain = ""
            sleep(3.0)
            self.logger.info(self.comment_chain)
            self.driver.get(self.current_home_url)
            sleep(1.0)

        self.driver.close()
