package com.example.LikeKBO.security;

import com.example.LikeKBO.entity.Admin;
import com.example.LikeKBO.entity.Role;
import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.repository.AdminRepository;
import com.example.LikeKBO.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * JWT 필터가 사용하는 UserDetailsService.
 * - subject가 admin.username이면 ADMIN 권한으로 로드
 * - subject가 user.email이면 USER 권한으로 로드
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Admin admin = adminRepository.findByUsername(username).orElse(null);
        if (admin != null) {
            List<GrantedAuthority> auth = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
            return new org.springframework.security.core.userdetails.User(
                    admin.getUsername(),
                    admin.getPassword(),
                    auth
            );
        }

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        Role role = (user.getRole() != null) ? user.getRole() : Role.USER;
        List<GrantedAuthority> auth = List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));

        // password는 passwordless라 비어있을 수 있음 -> 빈 문자열 허용
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                "",
                auth
        );
    }
}
