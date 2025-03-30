package com.sneakpeak.bricool.utils;


import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.city.CityRepository;
import com.sneakpeak.bricool.offers.OfferReturnDTO;
import com.sneakpeak.bricool.profession.Profession;
import com.sneakpeak.bricool.profession.ProfessionReturnDTO;
import com.sneakpeak.bricool.reviews.ReviewReturnDTO;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserReturnDTO;
import com.sneakpeak.bricool.worker.Worker;
import com.sneakpeak.bricool.worker.WorkerInfoDTO;
import com.sneakpeak.bricool.worker.WorkerReturnDTO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class EntityDtoMapper {
    private final ModelMapper modelMapper;
    private final CityRepository cityRepository;

    public EntityDtoMapper(ModelMapper modelMapper, CityRepository cityRepository) {
        this.modelMapper = modelMapper;

        modelMapper.getConfiguration()
                .setCollectionsMergeEnabled(false)
                .setSkipNullEnabled(true)
                .setFieldMatchingEnabled(true);

        modelMapper.typeMap(User.class, UserReturnDTO.class).addMappings(mapper -> {
                mapper.map(src -> src.getRole().getName(), UserReturnDTO::setRoleName);

                }
        );
        this.cityRepository = cityRepository;
    }

    public <D, T> D mapToDto(T entity, Class<D> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    public <D, T> T mapToEntity(D dto, Class<T> entityClass) {
        return modelMapper.map(dto, entityClass);
    }

    public <D, T> List<D> mapToDtoList(List<T> entityList, Class<D> dtoClass) {
        return entityList.stream()
                .map(entity -> mapToDto(entity, dtoClass))
                .collect(Collectors.toList());
    }

    public <D, T> List<T> mapToEntityList(List<D> dtoList, Class<T> entityClass) {
        return dtoList.stream()
                .map(dto -> mapToEntity(dto, entityClass))
                .collect(Collectors.toList());
    }


    public WorkerReturnDTO mapToWorkerReturnDTO(Worker worker) {
        if (worker == null) return null;

        WorkerReturnDTO dto = new WorkerReturnDTO();
        dto.setId(worker.getId());
        dto.setFirstName(worker.getFirstName());
        dto.setLastName(worker.getLastName());
        dto.setEmail(worker.getEmail());
        dto.setPhone(worker.getPhone());
        dto.setMemberSince(worker.getMemberSince());
        dto.setCity(worker.getCity());
        dto.setAvailable(worker.isAvailable());

        if (worker.getProfession() != null) {
            dto.setProfession(mapToDto(worker.getProfession(), ProfessionReturnDTO.class));
        }

        if (worker.getReviews() != null) {
            dto.setReviews(worker.getReviews().stream()
                    .map(review -> mapToDto(review, ReviewReturnDTO.class))
                    .collect(Collectors.toList()));
        }

        if (worker.getOffers() != null) {
            dto.setOffers(worker.getOffers().stream()
                    .map(offer -> mapToDto(offer, OfferReturnDTO.class))
                    .collect(Collectors.toList()));
        }

        return dto;
    }


}