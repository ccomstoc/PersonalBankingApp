package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.CategoryDAO;
import com.infosys.PersonalBankingApp.DAOs.TransactionDAO;
import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.CategoryNotFoundException;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryDTO;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryStatisticsDTO;
import com.infosys.PersonalBankingApp.Models.Transaction;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CategoryService {

    private CategoryDAO cDAO;
    private UserDAO uDAO;
    private TransactionDAO tDAO;
    private TransactionService tService;

    @Autowired
    public CategoryService(CategoryDAO cDAO, UserDAO uDAO, TransactionDAO tDAO, TransactionService tService) {
        this.cDAO = cDAO;
        this.uDAO = uDAO;
        this.tDAO = tDAO;
        this.tService = tService;
    }






    public Category createCategory(CategoryDTO catDTO) throws UserNotFoundException{
        User user = uDAO.findById(catDTO.getUserID()).orElseThrow(
                () -> new UserNotFoundException("User not found when creating category")
        );

        Category cat = new Category();
        cat.setUser(user);
        cat.setName(catDTO.getName());
        cat.setType(catDTO.getType());

        return cDAO.save(cat);

    }
    public Boolean deleteCategory(int catId)throws CategoryNotFoundException{
        if(cDAO.findById(catId).isPresent()) {
            cDAO.deleteById(catId);
            return true;
        }
        else {
            throw new CategoryNotFoundException("Category could not be found when deleting");
        }
    }

    public CategoryStatisticsDTO getCategoryStatisticsWithRange(int categoryId, LocalDate from, LocalDate to){
        int count = tDAO.getNumTransactionPerCategoryWithRange(categoryId, from, to);//TODO: Should really be calling from transactionService
        double amount = tDAO.getAmountPerCategoryWithRange(categoryId, from, to).get();//TODO: Really does it need to be optional?
        List<Transaction> transactions = tService.findByCategoryId(categoryId);


        return new CategoryStatisticsDTO(count,amount,transactions);

    }
}

