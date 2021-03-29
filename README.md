# Account Management Application
## To do
- Indexing for Account: https://docs.microsoft.com/en-us/ef/core/modeling/indexes?tabs=data-annotations
- Use Store_Paging_Usp_GetAllAccounts.sql
## Web App 
- using Angular 9 and .NET Core 2.2,Entity Framework Core
- Using Identity ASP.NET Core to manages users, passwords, profile data, roles
- Secure REST APIs using JWT
## To Run App:
- Client: 
	+ npm install
    + ng serve -o
- API: Delete all files in folder Migrations then run Migrations
    + To add your first migration! Instruct EF Core to create a migration named InitialCreate : 
		Add-Migration InitialCreate
    + Create your database and create your schema from the migration:  
		Update-Database
## Refference: https://youtu.be/MGCC2zTb0t4
