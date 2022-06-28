package com.moviemanagerapp.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/cartservice")
public class CartController {

    @Autowired
	private CartRepository cartRepository;

    @PostMapping("/save")
	public Cart saveCartDetails(@RequestBody Cart cart) {
		return cartRepository.save(cart);		
	}

	@GetMapping("/list")
	public List<Cart> getCartDetails() {
		return cartRepository.findAll();		
	}

	@GetMapping("/list/{cart_id}")
	public 	Optional<Cart> getOneCartDetail(@PathVariable("cart_id") String id) {
		return cartRepository.findById(id);		
	}
	
	@PutMapping("/update/{cart_id}")
	public Cart updateCartDetails(@RequestBody Cart cart, @PathVariable("cart_id") String id) {
		Optional<Cart> findById = cartRepository.findById(id);
		if(findById.isPresent()) {
		    Cart cartEntity = findById.get();
		    
			cartEntity.setMovieName(cart.getmovieName());
		
			cartEntity.setTime(cart.getTime());
			
			cartEntity.setPrice(cart.getPrice());
			
			cartEntity.setTheater(cart.getTheater());
			
			return cartRepository.save(cartEntity);
					
		}
		return null;
	}
	
	@DeleteMapping("/delete/{cart_id}")
	public String deleteCartDetails(@PathVariable("cart_id") String id) {
		cartRepository.deleteById(id);
		return "deleted succesfully";		
	}


    
}
