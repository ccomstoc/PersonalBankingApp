package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Exceptions.CategoryNotFoundException;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryDTO;
import com.infosys.PersonalBankingApp.Services.CategoryService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    private CategoryService catService;

    @Autowired
    public CategoryController(CategoryService catService) {
        this.catService = catService;
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO catDTO) throws UserNotFoundException {
        System.out.println("Creating category");
        return ResponseEntity.status(200).body(catService.createCategory(catDTO));
    }
    @DeleteMapping("{catID}")
    public ResponseEntity<Boolean> deleteCategory(@PathVariable int catID) throws CategoryNotFoundException {
        return ResponseEntity.status(200).body(catService.deleteCategory(catID));
    }

}
