package org.acme.quarkus.sample;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class PasswordRepository implements PanacheRepository<Password> {

    public Password findById(Long id) {
        return find("id", id).firstResult();
    }

    public Password findByPwd(String pwd) {
        return find("pwd", pwd).firstResult();
    }

    public List<Password> findActive() {
        return list("status", Status.ACTIVE);
    }

    public List<Password> findDeleted() {
        return list("status", Status.DELETED);
    }

    public List<Password> findNotActive() {
        return list("status", Status.NOT_ACTIVE);
    }

}
