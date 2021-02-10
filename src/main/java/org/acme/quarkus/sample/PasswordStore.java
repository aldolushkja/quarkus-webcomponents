package org.acme.quarkus.sample;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;

@ApplicationScoped
public class PasswordStore {

    @Inject
    PasswordRepository passwordRepository;

    public Password createPWD(String pwd) {
        Password password = new Password();
        password.setPwd(pwd);
        password.setCreatedAt(LocalDateTime.now());
        password.setUpdateAt(LocalDateTime.now());
        password.setStatus(Status.ACTIVE);
        return password;
    }

    public Password updatePWD(String oldpwd, String newPwd) {
        final Password password = passwordRepository.findByPwd(oldpwd);
        if (password != null) {
            password.setPwd(newPwd);
            password.setUpdateAt(LocalDateTime.now());
            passwordRepository.persistAndFlush(password);
        }
        return password;
    }
}
