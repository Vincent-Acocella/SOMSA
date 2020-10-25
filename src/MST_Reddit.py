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
        sleep(4.7)
        document_height = self.driver.execute_script("return document.body.scrollHeight")
        print(str(document_height))
        self.logger.info("DOCUMENT HEIGHT " + str(document_height))
        # We want to view the comments on the page, put we have to reveal them first
        #// *[ @ id = "SHORTCUT_FOCUSABLE_DIV"] / div[2] / div / div[3] / div[1] / div[2] / div[5] / div / button
        #// *[ @ id = "SHORTCUT_FOCUSABLE_DIV"] / div[2] / div / div[3] / div[1] / div[2] / div[5] / div / div
                #j9NixHqtN2j8SKHcdJ0om _2JBsHFobuapzGwpHQjrDlD _2nelDm85zKKmuD94NequP0
                #j9NixHqtN2j8SKHcdJ0om_2JBsHFobuapzGwpHQjrD1D_2ne1Dm85zKKmuD94NequP0
        #class ="j9NixHqtN2j8SKHcdJ0om_2JBsHFobuapzGwpHQjrD1D_2ne1Dm85zKKmuD94NequP0"]
        #self.driver.execute("window.scrollTo(0, 100);")


        sleep(3.0)
        view_comments_button = self.driver.find_element_by_xpath('//*[@class="j9NixHqtN2j8SKHcdJ0om _2JBsHFobuapzGwpHQjrDlD _2nelDm85zKKmuD94NequP0"]')
        #view_comments_button = self.driver.find_element_by_xpath('// *[ @ id = "SHORTCUT_FOCUSABLE_DIV"] / div[2] / div / div[3] / div[1] / div[2] / div[5] / div / button')
        #self.driver.execute_script("arguments[0].scrollIntoView(true);", view_comments_button)
        self.logger.info("SCROLL")
        #ActionChains(self.driver).move_to_element(view_comments_button).perform()
        self.driver.execute_script("window.scrollBy(0, 6000);")
        # High sleep values so I have time to interpret what the driver is doing and look at the console
        sleep(2.0)
        self.driver.execute_script("window.scrollTo(0, 700);")
        for i in range(2):
            #self.driver.find_element_by_tag_name("body").send_keys(Keys.END)
                                                          #_2GTMVdV2t3ka_zfkVHHo95
            #self.driver.find_element_by_xpath('//*[@class="_1k97Y32qzGNtuVGyt73TpR  wLV79_wV-ziNiWmf3Y7OV _2nelDm85zKKmuD94NequP0"]').send_keys(Keys.ARROW_DOWN)
            view_comments_button.send_keys(Keys.ARROW_DOWN)
            sleep(0.5)
            #view_comments_button.send_keys(Keys.PAGE_DOWN)
        self.logger.info("SCROLL")
        #self.driver.execute_script("window.scrollTo(467, 950);")

        view_comments_button.click()
        sleep(0.4)
        select = Selector(text=self.driver.page_source)
        self.logger.info('WEBSCRAPER TEST, ' + str(select))
        # Let's try collecting a comment
        #// *[ @ id = "t1_g9t76jp"] / div[2] / div[3] / div[2] / div / p[1] / text()
        #// *[ @ id = "t1_g9t76jp"] / div[2] / div[3] / div[2] / div / p[2] / text()
        #_1YCqQVO - 9r - Up6QPB9H6_4_1YCqQVO - 9r - Up6QPB9H6_4

        comments = select.xpath('//*[@class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"]')
        self.logger.info('COMMENT, ' + str(comments[0]))
        self.logger.info(comments[0].xpath('//p[2]/text()').getall())
        self.logger.info(comments[1].xpath('//p[2]/text()').getall())
        self.logger.info(comments[2].xpath('//p[2]/text()').getall())
        self.logger.info("...")
        for i in range(len(comments)):
            self.logger.info(comments.xpath('//p[' + str(i) + ']/text()').get())
            self.logger.info(str(i))
            break


        self.driver.close()
