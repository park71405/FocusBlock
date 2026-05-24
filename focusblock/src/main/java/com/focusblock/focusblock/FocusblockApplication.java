package com.focusblock.focusblock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class FocusblockApplication {

	public static void main(String[] args) {
		SpringApplication.run(FocusblockApplication.class, args);
	}

}
