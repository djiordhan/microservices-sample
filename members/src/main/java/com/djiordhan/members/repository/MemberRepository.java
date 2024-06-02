package com.djiordhan.members.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.djiordhan.members.model.Member;

public interface MemberRepository extends MongoRepository<Member, String> {
}