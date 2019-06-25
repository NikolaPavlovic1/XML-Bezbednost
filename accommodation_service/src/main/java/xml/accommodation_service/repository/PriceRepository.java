package xml.accommodation_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eureka.model.eurekamodel.model.Price;

public interface PriceRepository extends JpaRepository<Price, Long> {

	@Query("select price from Price price where price.accommodation.accommodationId = :id")
	public List<Price> getPrice(@Param("id") long id);
}
