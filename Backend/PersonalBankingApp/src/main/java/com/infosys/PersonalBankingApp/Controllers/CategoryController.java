package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryDTO;
import com.infosys.PersonalBankingApp.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService catService;

    @Autowired
    public CategoryController(CategoryService catService) {
        this.catService = catService;
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO catDTO) throws UserNotFoundException {
        return ResponseEntity.status(200).body(catService.createCategory(catDTO));
    }
}
