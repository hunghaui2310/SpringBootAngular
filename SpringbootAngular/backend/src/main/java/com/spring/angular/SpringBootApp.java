package com.spring.angular;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootApp {

    public static void main(String[] args){
        SpringApplication.run(SpringBootApp.class, args);
    }

    public String testSplit(String input){
        input = "10-sp01";
        String[] s = input.split("-");
        String result = s[0];
        return result;
    }
}
