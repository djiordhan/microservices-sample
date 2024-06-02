package com.djiordhan.members.config;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.djiordhan.members.model.Member;
import com.djiordhan.members.repository.MemberRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private MemberRepository memberRepository;

    private static final String[] FIRST_NAMES = { "John", "Jane", "Alex", "Emily", "Michael", "Sarah", "David", "Laura",
            "Chris", "Emma" };
    private static final String[] LAST_NAMES = { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
            "Davis", "Rodriguez", "Martinez" };
    private static final String[] CITIES = { "New York", "Los Angeles", "Chicago", "Houston", "Phoenix" };
    private static final String[] PROVINCES = { "NY", "CA", "IL", "TX", "AZ" };

    private final Random random = new Random();

    @Override
    public void run(String... args) throws Exception {
        if (memberRepository.count() == 0) {
            List<Member> members = new ArrayList<>();
            for (int i = 0; i < 50; i++) {
                members.add(new Member(
                        null,
                        getRandomFirstName(),
                        getRandomMiddleName(),
                        getRandomLastName(),
                        getRandomBirthDate(),
                        getRandomContact(),
                        getRandomStreetAddress(),
                        getRandomCity(),
                        getRandomProvince()));
            }
            memberRepository.saveAll(members);
        }
    }

    private String getRandomFirstName() {
        return FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
    }

    private String getRandomMiddleName() {
        return RandomStringUtils.randomAlphabetic(1).toUpperCase();
    }

    private String getRandomLastName() {
        return LAST_NAMES[random.nextInt(LAST_NAMES.length)];
    }

    private LocalDate getRandomBirthDate() {
        int year = 1950 + random.nextInt(51); // Between 1950 and 2000
        int dayOfYear = 1 + random.nextInt(365); // Between 1 and 365
        return LocalDate.ofYearDay(year, dayOfYear);
    }

    private String getRandomContact() {
        return String.format("%03d-%03d-%04d", random.nextInt(1000), random.nextInt(1000), random.nextInt(10000));
    }

    private String getRandomStreetAddress() {
        return random.nextInt(9999) + " " + RandomStringUtils.randomAlphabetic(8) + " St";
    }

    private String getRandomCity() {
        return CITIES[random.nextInt(CITIES.length)];
    }

    private String getRandomProvince() {
        return PROVINCES[random.nextInt(PROVINCES.length)];
    }
}
