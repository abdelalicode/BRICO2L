package com.sneakpeak.bricool.user;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("client")
public class Client extends User {
}
