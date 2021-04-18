package it.aldolushkja.passgenerator.password;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "pass_store")
public class PasswordEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

  @Column(name = "pass_gen")
  private String password;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updateAt;

  @Enumerated(EnumType.STRING)
  private PasswordStatus passwordStatus;
}
