package com.infosys.PersonalBankingApp.DAOs;

import com.infosys.PersonalBankingApp.Models.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.xml.catalog.Catalog;
import java.util.List;

@Repository
public interface CategoryDAO extends JpaRepository<Category, Integer> {

    public Category findByName(String name);

}
