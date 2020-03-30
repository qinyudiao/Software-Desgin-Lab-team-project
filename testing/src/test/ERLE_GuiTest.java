package test;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
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
	}
	
	@After public void finish() throws InterruptedException
	{
		wd.close();
	}
	
	// Test checks for any 404 Errors existent on our site
	/*@Test public void t0() throws InterruptedException
	{
		wd.get("https://www.everyrocketlaunch.com/about");
		boolean no404errors = checkFor404ErrorsOnSite(wd);
		
		assertEquals(false, no404errors);
	}*/
	
	// Test checks if all YouTube Links for Launches are valid
	@Test public void t1() throws InterruptedException
	{
		boolean brokenYouTubeLinkFound = false;
		
		wd.get("https://www.everyrocketlaunch.com/launch");
		Thread.sleep(3000);
		WebElement we;
		System.out.println(wd.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/span[1]/span")).getText());
		int maxNoPages = Integer.parseInt(wd.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/span[1]/span")).getText());
		System.out.println("Max number of pages: " + maxNoPages);
		String currentPageIndex = "";
		for(int i = 1; i <= maxNoPages; i++)
		{
			currentPageIndex = Integer.toString(i);
			System.out.println("Current Page Index: " + currentPageIndex);
			try
			{
					wd.get("https://www.everyrocketlaunch.com/launch");
					Thread.sleep(3000);
					we = wd.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/span[1]/div/input"));
					we.sendKeys(Keys.BACK_SPACE + currentPageIndex + "\n");
			}
			catch(Exception e) {continue;}
			List<WebElement> cells = wd.findElements(By.className("rt-td"));
			
			String contents[] = new String[cells.size()];
			
			int counter = 0;
			for(WebElement w: cells)
			{
				try
				{
					contents[counter] = w.getText();
				}
				catch(Exception e) {contents[counter] = "";}
				
				System.out.println("This was stored: " + contents[counter]);
				counter++;
			}
			System.out.println("yeah i got out");
			
			for(String cell_contents: contents)
			{
				if(cell_contents.contains("youtube"))
				{
					System.out.println(cell_contents);
					wd.navigate().to(cell_contents);
					if(wd.getTitle().contains("404")) 
					{
						brokenYouTubeLinkFound = true;
						System.out.println("Bad Link Found: "+ cell_contents);
					}
				}
				else {continue;}
			}
		}
		
		assertEquals(false, brokenYouTubeLinkFound);
		
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
