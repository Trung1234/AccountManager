--- Create Stored Procedure---
Create or ALTER Proc [dbo].[Usp_GetAllAccounts]  
 @PageNo INT 
As  
Begin  
	DECLARE @PageSize INT = 10;
    Select * From   (Select ROW_NUMBER() Over (  
    Order by Id ) AS 'RowNum', *  
         from   Accounts 
        )t  where t.RowNum Between ((@PageNo-1)*@PageSize +1) AND (@PageNo*@pageSize)  
        
End
