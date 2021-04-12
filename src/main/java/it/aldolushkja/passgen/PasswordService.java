package it.aldolushkja.passgen;

import at.favre.lib.crypto.bcrypt.BCrypt;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;

@ApplicationScoped
public class PasswordService {

  @Inject PasswordRepository passwordRepository;

  public PasswordEntity buildNewPwd(String pwd) {
    PasswordEntity passwordEntity = new PasswordEntity();
    passwordEntity.setPassword(BCrypt.withDefaults().hashToString(10, pwd.toCharArray()));
    passwordEntity.setCreatedAt(LocalDateTime.now());
    passwordEntity.setUpdateAt(LocalDateTime.now());
    passwordEntity.setStatus(Status.ACTIVE);
    return passwordEntity;
  }

  public PasswordEntity update(String oldpwd, String newPwd) {
    final PasswordEntity passwordEntity = passwordRepository.findByPwd(oldpwd);
    if (passwordEntity != null) {
      passwordEntity.setPassword(newPwd);
      passwordEntity.setUpdateAt(LocalDateTime.now());
      passwordRepository.persistAndFlush(passwordEntity);
    }
    return passwordEntity;
  }
}
