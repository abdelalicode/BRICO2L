package com.sneakpeak.bricool.worker;

import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.city.CityRepository;
import com.sneakpeak.bricool.exception.NotFoundException;
import com.sneakpeak.bricool.profession.Profession;
import com.sneakpeak.bricool.profession.ProfessionRepository;
import com.sneakpeak.bricool.role.RoleRepository;
import com.sneakpeak.bricool.role.RoleType;
import com.sneakpeak.bricool.token.TokenRepository;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final TokenRepository tokenRepository;
    private final WorkerRepository workerRepository;
    private final CityRepository cityRepository;
    private final ProfessionRepository professionRepository;


    public WorkerService(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, TokenRepository tokenRepository, WorkerRepository workerRepository, CityRepository cityRepository, ProfessionRepository professionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.modelMapper = modelMapper;
        this.tokenRepository = tokenRepository;
        this.workerRepository = workerRepository;
        this.cityRepository = cityRepository;
        this.professionRepository = professionRepository;
    }


    public Worker updateWorker(WorkerInfoDTO workerInfos, String userMail) {

        Worker existingWorker = workerRepository.findByEmail(userMail)
                .orElseThrow(() -> new NotFoundException("Worker not found"));

        City city = cityRepository.findById(workerInfos.getCityId()).orElse(null);
        Profession profession = professionRepository.findById(workerInfos.getProfessionId()).orElse(null);

        existingWorker.setCity(city);
        existingWorker.setProfession(profession);

        System.out.println(existingWorker);

        return userRepository.save(existingWorker);

    }


    public List<User> findAllWorkers() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole().getName().equals(RoleType.WORKER))
                .toList();
    }

    public Optional<Worker> getWorker(Object workerAttribute) {

        if(workerAttribute instanceof String) {
            Optional<User> user = userRepository.findByEmail((String) workerAttribute);
            if (user.isPresent() && user.get() instanceof Worker) {
                return Optional.of((Worker) user.get());
            }
        }
        Optional<User> user = userRepository.findById((Long) workerAttribute);
        if (user.isPresent() && user.get() instanceof Worker) {
            return Optional.of((Worker) user.get());
        }
        return Optional.empty();
    }


}
