package it.aldolushkja.passgenerator.content;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.Table;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@Table(name = "POST")
public class Post extends PanacheEntity {

    public String title;
    public String content;

    public LocalDateTime createdAt;
    public String createdBy;
    public LocalDateTime lastUpdatedAt;
    public String lastUpdatedBy;

}
