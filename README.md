# Account Management Application
## Web App using Angular 9 and .NET Core 2.2,Entity Framework Core, Identity ASP.NET Core
## To Run App:
- Client: 
	+ npm install
    + ng serve -o
- API: Delete all files in folder Migrations then run Migrations
    + To add your first migration! Instruct EF Core to create a migration named InitialCreate : 
		Add-Migration InitialCreate
    + Create your database and create your schema from the migration:  
		Update-Database
