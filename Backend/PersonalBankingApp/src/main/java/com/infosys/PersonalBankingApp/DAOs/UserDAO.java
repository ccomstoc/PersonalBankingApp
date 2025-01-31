package com.infosys.PersonalBankingApp.DAOs;

import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<User,Integer> {

}
