# Account Management Application
## Web App 
- using Angular 9 and .NET Core 2.2,Entity Framework Core, SQL Server 2019
- Using Identity ASP.NET Core to manage users, passwords, profile data, roles
- Secure REST APIs using JWT
## To Run App:
- Client: 
    + npm install
    + ng serve -o
- API:
    + Delete all files in folder Migrations 
    + Change DefaultConnection to your Connection Strings
    + For database migration , we need to follow the following steps.
		- Tools -> NuGet Package Manager -> Package Manager Console.
		- Run PM> Add-Migration MyFirstMigration to scaffold a migration to create the initial set of tables for our model. 	
		- Run PM> Update-Database to apply the new migration to the database. 
		- Since our database doesn't exist yet, it will be created for us before the migration is applied
    + Run Import api to import 1000 account to DB		

## GET vs POST: Key Difference between HTTP Methods
   + In GET method, values are visible in the URL while in POST method, values are NOT visible in the URL.
    + GET has a limitation on the length of the values, generally 255 characters whereas POST has no limitation on the length of the values since they are submitted via the body of HTTP.
    + GET request is often cacheable while POST request is hardly cacheable.		
    + POST is more secure than GET


## Refference: 
- https://youtu.be/MGCC2zTb0t4
- https://docs.microsoft.com/en-us/aspnet/core/web-api/advanced/formatting?view=aspnetcore-5.0
- https://docs.microsoft.com/en-us/ef/core/modeling/indexes?tabs=data-annotations
- https://www.codaffection.com/angular-article/angular-5-login-and-logout-with-web-api-using-token-based-authentication/
- https://dev.to/kushagra_mehta/from-zero-to-hero-l-in-authentication-part-1-38od
- https://topdev.vn/blog/jwt-la-gi/
