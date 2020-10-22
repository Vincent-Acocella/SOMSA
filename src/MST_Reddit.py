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
from time import sleep


class MSTRedditSpider(Spider):

    name = "Reddit_Spider"
    # Placeholder url, the real url we want to visit will be called on creation of the webdriver
    start_urls = ('http://example.com/',)

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
        #// *[ @ id = "t3_jfvlxn"] / div[2] / article / div
        post = self.driver.find_element_by_xpath('//*[@class="_32pB7ODBwG3OSx1u_17g58"]')
        post.click()
        # Give the page some time to load
        sleep(1.5)
        document_height = self.driver.execute_script("return document.body.scrollHeight")
        select = Selector(text = self.driver.page_source)
        self.logger.info('WEBSCRAPER TEST, ' + str(select))
        self.driver.close()
