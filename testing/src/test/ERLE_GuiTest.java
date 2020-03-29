package test;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ERLE_GuiTest 
{
	WebDriver wd;
	static ArrayList<String> visitedLinks = new ArrayList<String>();
	
	@Before public void setup() throws InterruptedException
	{
		System.setProperty("webdriver.chrome.driver",System.getProperty("user.dir") + "\\src\\test\\chromedriver.exe");
		
		wd = new ChromeDriver(); 
		wd.get("https://www.everyrocketlaunch.com/about");
	}
	
	@After public void finish() throws InterruptedException
	{
		wd.close();
	}
	
	// Test checks for any 404 Errors existent on our site
	@Test public void t0() throws InterruptedException
	{
		boolean no404errors = checkFor404ErrorsOnSite(wd);
		
		assertEquals(false, no404errors);
	}
	
	public static boolean checkFor404ErrorsOnSite(WebDriver driver)
	{
		boolean found404Error = false;
		
		List<WebElement> all_link_attributes = driver.findElements(By.tagName("a"));
		
		if(all_link_attributes.size() == 0) {return false;}
		
		String links[] = new String[all_link_attributes.size()];
		
		int counter = 0;
		for(WebElement w: all_link_attributes)
		{
			links[counter] = w.getAttribute("href");
			//System.out.println(links[counter]);
			counter++;
		}
		for(String link: links)
		{
			if(!visitedLinks.contains(link) && link.contains("everyrocketlaunch")) {visitedLinks.add(link);}
			else {continue;}
			driver.navigate().to(link);
			System.out.println(link);
			if(checkFor404ErrorsOnSite(driver) == true) {return true;}
			if(driver.getTitle().contains("404")){found404Error = true;}
		}
		return found404Error;
	}
}
