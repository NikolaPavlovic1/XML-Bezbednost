package com.example.bezbednost.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bezbednost.model.User;
import com.example.bezbednost.security.CustomUserDetailsService;
import com.example.bezbednost.security.TokenHelper;
import com.example.bezbednost.service.UserService;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	TokenHelper tokenHelper;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private UserService userService;

	@PostMapping(value = "/login", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> createAuthenticationToken(@RequestParam("email") String email, @RequestParam("password") String password) {
		// Izvrsavanje security dela
		Authentication authentication;
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			//logger.info("User " + email + " successfully logged in");
		} catch (AuthenticationException e) {
			logger.error("PK, SE_EVENT");
			return new ResponseEntity<String>("Wrong email/password.", HttpStatus.FORBIDDEN);
		}

		// Ubaci username + password u kontext
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Kreiraj token
		User user = (User) authentication.getPrincipal();
		String jws = tokenHelper.generateToken(user.getEmail());

		// Vrati token kao odgovor na uspesno autentifikaciju
		logger.info("UL-K: {}, SE_EVENT", email);
		return new ResponseEntity<String>(jws, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping(value = "/current-user")
	public ResponseEntity<User> getCurrentUser(Principal principal) {
		if (principal == null) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		User user = userService.findOne(principal.getName());
		if (user == null) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@PostMapping(value = "/change-password")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
		userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
		Map<String, String> result = new HashMap<>();
		result.put("result", "success");
		return ResponseEntity.accepted().body(result);
	}

	static class PasswordChanger {
		public String oldPassword;
		public String newPassword;
	}
}
