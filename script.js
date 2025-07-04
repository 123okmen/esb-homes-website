window.onload = function() {
    // ... các đoạn code khác ...

    // Thêm lấy loại công trình
    const buildingTypeSelect = document.getElementById('building_type');

    // ... giữ nguyên các đoạn code khác ...

    estimatorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const area = parseFloat(areaInput.value);
        const floors = parseInt(floorsInput.value);

        // ... kiểm tra hợp lệ giữ nguyên ...

        costLoadingSpinner.style.display = 'inline-block';
        resultsSection.classList.add('hidden');

        setTimeout(() => {
            // Lấy các giá trị
            const buildingType = buildingTypeSelect.value; // "nhapho" hoặc "bietthu"
            const finish = finishSelect.value; // "basic", "standard", "premium"
            // ... các biến khác nếu cần ...

            // Lấy tổng diện tích thực
            const totalArea = area * floors;

            // Lấy đơn giá/m² theo bảng
            let unitPrice = 0;

            if (buildingType === 'nhapho') {
                if (totalArea >= 100 && totalArea < 200) {
                    unitPrice = (finish === 'premium') ? 250000 : 200000;
                } else if (totalArea >= 200 && totalArea < 300) {
                    unitPrice = (finish === 'premium') ? 250000 : 150000;
                } else if (totalArea >= 300 && totalArea < 400) {
                    unitPrice = (finish === 'premium') ? 250000 : 130000;
                } else if (totalArea >= 400 && totalArea <= 1000) {
                    unitPrice = (finish === 'premium') ? 200000 : 100000;
                }
            } else if (buildingType === 'bietthu') {
                if (totalArea >= 200 && totalArea < 300) {
                    unitPrice = (finish === 'premium') ? 300000 : 200000;
                } else if (totalArea >= 300 && totalArea < 400) {
                    unitPrice = (finish === 'premium') ? 300000 : 200000;
                } else if (totalArea >= 400 && totalArea <= 1000) {
                    unitPrice = (finish === 'premium') ? 300000 : 200000;
                }
            }

            if (unitPrice === 0) {
                costError.textContent = 'Vui lòng nhập diện tích phù hợp với bảng giá!';
                costError.classList.remove('hidden');
                resultsSection.classList.add('hidden');
                costLoadingSpinner.style.display = 'none';
                return;
            }

            // Tính tổng chi phí
            const totalEstimatedCost = totalArea * unitPrice;

            // ... giữ nguyên các đoạn cập nhật biểu đồ và hiển thị kết quả ...
            estimatedCostDisplay.textContent = `${totalEstimatedCost.toLocaleString('vi-VN')} VNĐ`;

            // ... biểu đồ, phân bổ, v.v. giữ nguyên ...
            resultsSection.classList.remove('hidden');
            costLoadingSpinner.style.display = 'none';
        }, 700);
    });

    // ... các đoạn code khác ...
};
