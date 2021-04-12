package it.aldolushkja.passgen;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class PasswordRepository implements PanacheRepository<PasswordEntity> {

  public PasswordEntity findById(Long id) {
    return find("id", id).firstResult();
  }

  public PasswordEntity findByPwd(String pwd) {
    return find("pwd", pwd).firstResult();
  }

  public List<PasswordEntity> findActive() {
    return list("status", Status.ACTIVE);
  }

  public List<PasswordEntity> findDeleted() {
    return list("status", Status.DELETED);
  }

  public List<PasswordEntity> findNotActive() {
    return list("status", Status.NOT_ACTIVE);
  }
}