package com.eureka.auth.eurekaauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EntityScan("com.eureka.model.eurekamodel.model")
public class EurekaAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaAuthApplication.class, args);
	}

}
