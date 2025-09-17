package com.report.authController;
 import com.report.AuthDTOs.AuthResponse;
        import com.report.AuthDTOs.LoginRequest;
 import com.report.AuthDTOs.RefreshTokenRequest;
 import com.report.DTOs.UserDTO;
 import com.report.authServices.AuthService;
        import com.report.authServices.JwtService;
        import com.report.authServices.RefreshTokenService;
        import com.report.entities.RefreshToken;
        import com.report.entities.User;
        import com.report.repository.UserRepo;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
        import org.springframework.security.core.Authentication;
        import org.springframework.security.core.context.SecurityContextHolder;
        import org.springframework.web.bind.annotation.CrossOrigin;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RequestBody;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RestController;
        import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class AuthController {


    private final AuthService service;
    private final RefreshTokenService refreshTokenService;
    private final UserRepo userRepository;
    private final JwtService jwtService;

    public AuthController(AuthService authService, RefreshTokenService refreshTokenService, JwtService jwtService, UserRepo userRepository) {
        this.service = authService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.userRepository=userRepository;
    }

//    @PostMapping("/register")
//    public ResponseEntity<AuthResponse> registerUser(@RequestBody RegisterRequest registerRequest) {
//        return ResponseEntity.ok(service.register(registerRequest));
//    }
@PostMapping("/register")
public ResponseEntity<AuthResponse> registerUser(@RequestBody UserDTO registerRequest) {
    return ResponseEntity.ok(service.register(registerRequest));
}


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("printitn login data"+loginRequest);
        return ResponseEntity.ok(service.login(loginRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {

        RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(refreshTokenRequest.getRefreshToken());
        User user = refreshToken.getUser();

        String accessToken = jwtService.generateToken(user);

        return ResponseEntity.ok(AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build());
    }

    @GetMapping("/profile")
    public ResponseEntity <User> getLoggedUser(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        System.out.println("getAuthorities"+authentication.getAuthorities());
        System.out.println("getname"+authentication.getName());
        System.out.println("getdetails"+authentication.getDetails());
        System.out.println("principal"+authentication.getPrincipal());
        System.out.println("credentials"+authentication.getCredentials());
        User user= userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("user not found"));

        return ResponseEntity.ok(user);

    }


}
