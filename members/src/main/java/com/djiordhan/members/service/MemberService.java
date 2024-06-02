package com.djiordhan.members.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.djiordhan.members.model.Member;
import com.djiordhan.members.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(String memberId) {
        return memberRepository.findById(memberId);
    }

    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(String memberId, Member memberDetails) {
        return memberRepository.findById(memberId).map(member -> {
            member.setFirstName(memberDetails.getFirstName());
            member.setMiddleName(memberDetails.getMiddleName());
            member.setLastName(memberDetails.getLastName());
            member.setBirthDate(memberDetails.getBirthDate());
            member.setContact(memberDetails.getContact());
            member.setStreetAddress(memberDetails.getStreetAddress());
            member.setCity(memberDetails.getCity());
            member.setProvince(memberDetails.getProvince());
            return memberRepository.save(member);
        }).orElseGet(() -> {
            memberDetails.setMemberId(memberId);
            return memberRepository.save(memberDetails);
        });
    }

    public void deleteMember(String memberId) {
        memberRepository.deleteById(memberId);
    }
}
