"""
Testing usage of Selenium to access Reddit
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


class MSTRedditSpider(Spider):

    name = "Reddit_Spider"
    # Placeholder url, the real url we want to visit will be called on creation of the webdriver
    start_urls = ('http://example.com/',)
    # This is where we will store comments for every reddit page
    # The key used represents what topic(s) they belong to
    thread_titles = []
    comments = []
    comment_chain = ""

    current_home_url = 'http://example.com/'

    AMOUNT_OF_PAGE_SCROLLS = 50
    THREADS_TO_SCRAPE = 8

    def scrape_subreddit(self):
        self.driver.get(self.current_home_url)
        sleep(0.7)

        # Scroll to the bottom of the page, then to the top
        # This allows us to load in more Reddit Threads to grab
        # interactable is simply something on the page we can interaction with
        # We need it to actually do the scrolling
        # In the cases where we use it here, it is the comments listing on the first thread
        interactable = self.driver.find_element_by_xpath(
            '//*[@class="_1UoeAeSRhOKSNdY_h3iS1O _1Hw7tY9pMr-T1F4P1C-xNU _2qww3J5KKzsD7e5DO0BvvU"]')
        interactable = self.driver.find_element_by_xpath('//*[@id="USER_DROPDOWN_ID"]')
        for i in range(5):
            interactable.send_keys(Keys.PAGE_DOWN)
            sleep(1.0)
        for i in range(5):
            interactable.send_keys(Keys.PAGE_UP)

        # Get the Reddit threads currently loaded on the page
        select = Selector(text=self.driver.page_source)
        threads_selection = select.xpath('//div[@class="rpBJOHq2PR60pnwJlUyP0"]/div/div/div/@data-testid')
        threads_selection = select.xpath('//*[@data-test-id="comments-page-link-num-comments"]/@href')
        threads_selection = select.xpath('//*[@data-click-id="comments"]/@href')
        thread_classes = select.xpath('//div[@class="rpBJOHq2PR60pnwJlUyP0"]/div/div/div/@class').getall()
        reddit_threads = threads_selection.getall()

        self.logger.info(reddit_threads)

        self.thread_titles = select.xpath('//h3[@class="_eYtD2XCVieq6emjKBH3m"]/text()').getall()

        for i in range(self.THREADS_TO_SCRAPE):
            # select = Selector(text=self.driver.page_source)
            interactable = self.driver.find_element_by_xpath(
                '//*[@class="_1UoeAeSRhOKSNdY_h3iS1O _1Hw7tY9pMr-T1F4P1C-xNU _2qww3J5KKzsD7e5DO0BvvU"]')
            # self.do_comment_scroll(interactable, SCROLL_MULTIPLE * i)
            next_thread = reddit_threads[i]
            xpath = '//*[@data-testid="' + next_thread + '"]'
            # The link to the next thread comments section
            xpath = 'https://www.reddit.com' + next_thread

            # Thread classes have the keyword 'promotedlink' in them if they are an advertisement
            # That does not pertain to the subreddit
            if not "promotedlink" in thread_classes[i]:
                try:
                    self.reddit_thread_lookup(xpath)

                except NoSuchElementException:
                    self.logger.info("Page " + xpath + " not found")
                    self.driver.get(self.current_home_url)
                    # Remove the title from the list since we're skipping it
                    self.thread_titles.pop(i)
            else:
                self.thread_titles.pop(i)


    def do_comment_scroll(self, page_element, num_scrolls):
        for i in range(num_scrolls):
            page_element.send_keys(Keys.ARROW_DOWN)
            sleep(0.3)

    def get_comments(self, selection, key):
       # self.logger.info(selection.xpath('//p/text()').getall())
        for comment in selection.xpath('.//p/text()').getall():
           # self.logger.info(comment)
            #self.comments[key].append(comment)
            self.comment_chain += comment + " "

    def reddit_thread_lookup(self, thread_xpath):
        # We want to clear the comments dictionary every run
        self.comment_chain = ""
        self.logger.info("THREAD LOOKUP " + thread_xpath)


        self.driver.get(thread_xpath)
        # Give the page some time to load
        sleep(4.7)

        select = Selector(text=self.driver.page_source)
        # Next we want to verify that the page has enough comments
        # Select the portion of the page that includes the number of comments on the thread
        num_comments_selection = select.xpath('//div[@data-test-id="post-content"]')
        num_comments_selection = num_comments_selection.xpath('.//a[@data-test-id="comments-page-link-num-comments"]')
        num_comments_selection = num_comments_selection.xpath('.//span/text()').getall()
        # This should be structured as a table of strings,
        # the first indices will be the individual chars of the comment count
        # The second to last index will be the actual number we want with the word 'comments'
        # (And the last index is just the word 'comments')
        index = len(num_comments_selection) - 2
        self.logger.info(num_comments_selection)
        num_comments = str(num_comments_selection[index]).split()
        num_comments = num_comments[0]
        try:
            num_comments = int(num_comments)
        except ValueError:
            # Once the amount of comments on a thread become large enough
            # Reddit displays them as 'x.0k comments'
            # We cannot turn that into an int as-is
            num_comments = num_comments.replace('.', '')
            num_comments = num_comments.strip('k')
            num_comments += "00"
            num_comments = int(num_comments)

        self.logger.info(num_comments)
        if num_comments < 20:
            #self.driver.get(self.current_home_url)
            #sleep(4.0)
            raise NoSuchElementException

        view_comments_button = self.driver.find_element_by_xpath(
            '//button[@class="j9NixHqtN2j8SKHcdJ0om _2JBsHFobuapzGwpHQjrDlD _2nelDm85zKKmuD94NequP0"]')

        comments_selector = select.xpath('//div[@class="_1ump7uMrSA43cqok14tPrG _1oTUrVtKJk1ue0r3fe31kJ"]')
        comments_selector = comments_selector.xpath('//*[@id="t1_ga2312g"]/div[2]/div[3]/div[2]')
        # self.get_comments(comments_selector, 0)

        # Use the login button for scrolling
        login_button = self.driver.find_element_by_xpath(
            '//*[@class="_3fM1M9rFBqKwfG-KJLnxPY _1HunhFR-0b-AYs0WG9mU_P _2nelDm85zKKmuD94NequP0"]')

        for i in range(15):

            login_button.send_keys(Keys.ARROW_DOWN)
            sleep(0.5)
            # view_comments_button.send_keys(Keys.PAGE_DOWN)
        self.logger.info("SCROLL")
        # self.driver.execute_script("window.scrollTo(467, 950);")

        view_comments_button.click()
        sleep(0.4)
        self.do_comment_scroll(login_button, self.AMOUNT_OF_PAGE_SCROLLS)
        select = Selector(text=self.driver.page_source)
        self.logger.info('WEBSCRAPER TEST, ' + str(select))

        comments_selector = select.xpath('//*[@class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"]')
        # self.logger.info(comments.xpath('//p/text()').getall())
        self.logger.info('COMMENT, ' + str(comments_selector[0]))
        self.logger.info("...")

        self.get_comments(comments_selector, thread_xpath)
        self.comments.append(self.comment_chain)
        self.driver.get(self.current_home_url)
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

        # Scrape world news
        self.current_home_url = 'https://www.reddit.com/r/worldnews/'
        self.scrape_subreddit()
        for i in range(len(self.comments)):
            yield{
                self.thread_titles[i]: [self.comments[i], 'Trending'],
                'Topic': 'Trending'
            }
        # Reset
        self.comments = []

        # Scrape Sports
        self.current_home_url = 'https://www.reddit.com/r/sports/'
        self.scrape_subreddit()
        for i in range(len(self.comments)):
            yield {
                self.thread_titles[i]: [self.comments[i], 'Sports'],
                'Topic': 'Sports'
            }
        # Reset
        self.comments = []

        # Scrape Politics
        self.current_home_url = 'https://www.reddit.com/r/politics/'
        self.scrape_subreddit()
        for i in range(len(self.comments)):
            yield {
                self.thread_titles[i]: [self.comments[i], 'Politics'],
                'Topic': 'Politics'
            }
        # Reset
        self.comments = []

        # Scrape Science
        self.current_home_url = 'https://www.reddit.com/r/science/'
        self.scrape_subreddit()
        for i in range(len(self.comments)):
            yield {
                self.thread_titles[i]: [self.comments[i], 'Science'], 
                'Topic': 'Science'
            }
        # Reset
        self.comments = []

        # Scrape Environment
        self.current_home_url = 'https://www.reddit.com/r/environment/'
        self.scrape_subreddit()
        for i in range(len(self.comments)):
            yield {
                self.thread_titles[i]: [self.comments[i], 'Environment'],
                'Topic': 'Environment'
            }
        # Reset
        self.comments = []

        # Scrape Technology
        self.current_home_url = 'https://www.reddit.com/r/technology/'
        self.scrape_subreddit()
        for i in range(len(self.comments)):
            yield {
                self.thread_titles[i]: [self.comments[i], 'Technology'],
                'Topic': 'Technology'
            }
        # Reset
        self.comments = []
        self.driver.close()