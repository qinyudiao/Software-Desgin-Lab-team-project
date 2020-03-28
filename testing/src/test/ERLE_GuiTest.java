package test;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ERLE_GuiTest 
{
	@Test public void t0() throws InterruptedException{
		// execute the test <x = 0, y = 0, z = 0, submitButton = click> and check the output message is correct
		System.out.println(System.getProperty("user.dir"));
		System.setProperty("webdriver.chrome.driver",System.getProperty("user.dir") + "\\src\\test\\chromedriver.exe");
		
		WebDriver wd = new ChromeDriver(); // launch the browser
		wd.get("https://www.everyrocketlaunch.com/");
		
		String webSiteName = wd.getTitle();
		wd.quit(); // close the browser window
		
		//System.out.println(webSiteName);
		assertEquals("Every Rocket Launch", webSiteName);
		
		////assertTrue(driver.getTitle().contains("404"));

	}
}
