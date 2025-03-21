package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.CategoryDAO;
import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.CategoryNotFoundException;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryDTO;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private CategoryDAO cDAO;
    private UserDAO uDAO;

    @Autowired
    public CategoryService(CategoryDAO cDAO, UserDAO uDAO) {
        this.cDAO = cDAO;
        this.uDAO = uDAO;
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
}

