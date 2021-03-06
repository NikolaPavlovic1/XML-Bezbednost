package com.eureka.zuul.eurekazuul.security;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.eureka.model.eurekamodel.security.JwtConfig;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtConfig jwtConfig;
 
	@Override
  	protected void configure(HttpSecurity http) throws Exception {
    	   http
		.csrf().disable()
		    // make sure we use stateless session; session won't be used to store user's state.
	 	    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) 	
		.and()
		    // handle an authorized attempts 
		    .exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED)) 	
		.and()
		   // Add a filter to validate the tokens with every request
		   .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
		// authorization requests config
		.authorizeRequests()
		
			.antMatchers("/auth/User/registration").permitAll()
		   // allow all who are accessing "auth" service
		   //.antMatchers("/admin/test").permitAll()  
		   .antMatchers(HttpMethod.POST, "/auth/login").permitAll()  
		   // must be an admin if trying to access admin area (authentication is also required here)
		   .antMatchers("/auth/admin/**").hasRole("ADMIN")
		   .antMatchers("/accomodation/accService/admin/**").hasRole("ADMIN")
		   .antMatchers("/accomodation/accService/all/**").permitAll()
		   .antMatchers("/accomodation/accType/admin/**").hasRole("ADMIN")
		   .antMatchers("/accomodation/accType/all/**").permitAll()
		   .antMatchers("/accomodation/acc/all/**").permitAll()
		   .antMatchers("/accomodation/image/**").permitAll()
		   .antMatchers("/accomodation/price/**").permitAll()
		   .antMatchers("/reservation/res/**").hasRole("USER")
		   .antMatchers("/messagge/mess/**").hasRole("USER")
		   .antMatchers("/auth/soap/**").permitAll()
		   .antMatchers("/accomodation/soap/**").permitAll()
		   // Any other request must be authenticated
		   .anyRequest().authenticated(); 
	}
	
	@Bean
  	public JwtConfig jwtConfig() {
    	   return new JwtConfig();
  	}
}
