package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    WatchList findWatchListByUserId(Long userId);
}
