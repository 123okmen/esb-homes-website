window.onload = function() {
    // --- FORM ƯỚC TÍNH CHI PHÍ ---
    const estimatorForm = document.getElementById('estimatorForm');
    const areaInput = document.getElementById('area');
    const floorsInput = document.getElementById('floors');
    const styleSelect = document.getElementById('style');
    const finishSelect = document.getElementById('finish');
    const foundationTypeSelect = document.getElementById('foundation_type');
    const mezzanineOptionSelect = document.getElementById('mezzanine_option');
    const rooftopOptionSelect = document.getElementById('rooftop_option');
    const roofTypeSelect = document.getElementById('roof_type');
    const buildingTypeSelect = document.getElementById('building_type');

    // Kết quả
    const resultsSection = document.getElementById('resultsSection');
    const estimatedCostDisplay = document.getElementById('estimatedCost');
    const costLoadingSpinner = document.getElementById('costLoadingSpinner');
    const costError = document.getElementById('costError');
    const ctxCostBreakdown = document.getElementById('costBreakdownChart').getContext('2d');

    // Bảng chi tiết từng phần
    let detailTable = document.getElementById('detailedBreakdownTable');
    let detailTableBody;
    if (!detailTable) {
        // Nếu chưa có, tự động tạo bảng dưới resultsSection
        detailTable = document.createElement('table');
        detailTable.id = 'detailedBreakdownTable';
        detailTable.className = 'table-auto w-full mt-8 mb-6 text-base';
        detailTable.innerHTML = `
            <thead>
                <tr>
                    <th>Hạng mục</th>
                    <th>Tỷ lệ (%)</th>
                    <th>Chi phí (VNĐ)</th>
                </tr>
            </thead>
            <tbody id="detailedBreakdownTableBody"></tbody>
        `;
        resultsSection && resultsSection.appendChild(detailTable);
    }
    detailTableBody = document.getElementById('detailedBreakdownTableBody');

    let costBreakdownChart = new Chart(ctxCostBreakdown, {
        type: 'bar',
        data: {
            labels: ['Phần thô', 'Hoàn thiện', 'M&E', 'Thiết kế & Giấy phép', 'Dự phòng'],
            datasets: [{
                label: 'Phân bổ Chi phí',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(251, 191, 36, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(217, 119, 6, 0.7)',
                    'rgba(180, 83, 9, 0.7)',
                    'rgba(124, 45, 6, 0.7)'
                ],
                borderColor: [
                    'rgb(251, 191, 36)',
                    'rgb(245, 158, 11)',
                    'rgb(217, 119, 6)',
                    'rgb(180, 83, 9)',
                    'rgb(124, 45, 6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Tỷ lệ (%)', color: '#3a3a3a' },
                    ticks: { color: '#3a3a3a' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                x: {
                    ticks: { color: '#3a3a3a' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += context.parsed.y + '%';
                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'PHÂN BỔ CHI PHÍ ƯỚC TÍNH (TỶ LỆ PHẦN TRĂM)',
                    font: { size: 16, family: 'Arial', color: '#3a3a3a' }
                }
            }
        }
    });

    estimatorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const area = parseFloat(areaInput.value);
        const floors = parseInt(floorsInput.value);

        if (isNaN(area) || area <= 0 || isNaN(floors) || floors <= 0) {
            costError.textContent = 'Vui lòng nhập diện tích và số tầng hợp lệ.';
            costError.classList.remove('hidden');
            resultsSection.classList.add('hidden');
            return;
        } else {
            costError.classList.add('hidden');
        }
        costLoadingSpinner.style.display = 'inline-block';
        resultsSection.classList.add('hidden');

        setTimeout(() => {
            // Lấy các giá trị
            const buildingType = buildingTypeSelect ? buildingTypeSelect.value : 'nhapho'; // "nhapho" hoặc "bietthu"
            const finish = finishSelect.value; // "basic", "standard", "premium"

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

            // Hiển thị kết quả
            estimatedCostDisplay.textContent = `${totalEstimatedCost.toLocaleString('vi-VN')} VNĐ`;

            // --- Chi tiết từng phần
            // Tỷ lệ từng phần theo mức hoàn thiện (ví dụ chuẩn ngành)
            const breakdownPercentages = {
                'basic':    { rough: 40, finishing: 30, me: 15, design: 10, contingency: 5 },
                'standard': { rough: 35, finishing: 35, me: 15, design: 10, contingency: 5 },
                'premium':  { rough: 30, finishing: 40, me: 15, design: 10, contingency: 5 }
            };
            // Nếu dùng "thông dụng" là standard
            const currentBreakdownPercents = breakdownPercentages[finish === 'basic' ? 'standard' : finish];

            // Update chart
            costBreakdownChart.data.datasets[0].data = Object.values(currentBreakdownPercents);
            costBreakdownChart.update();

            // Bảng chi tiết từng phần
            if (detailTableBody) detailTableBody.innerHTML = '';
            const detailRows = [
                { name: 'Phần thô', percent: currentBreakdownPercents.rough },
                { name: 'Hoàn thiện', percent: currentBreakdownPercents.finishing },
                { name: 'M&E (Điện nước)', percent: currentBreakdownPercents.me },
                { name: 'Thiết kế & Giấy phép', percent: currentBreakdownPercents.design },
                { name: 'Dự phòng', percent: currentBreakdownPercents.contingency }
            ];
            detailRows.forEach(row => {
                const cost = Math.round(totalEstimatedCost * row.percent / 100);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="font-semibold">${row.name}</td>
                    <td class="text-center">${row.percent} %</td>
                    <td class="text-right font-bold">${cost.toLocaleString('vi-VN')}</td>
                `;
                detailTableBody && detailTableBody.appendChild(tr);
            });

            resultsSection.classList.remove('hidden');
            costLoadingSpinner.style.display = 'none';
        }, 700);
    });

    // Animation scroll to form nếu bấm nút ở hero-section
    document.querySelectorAll('a[href="#estimate-section"]').forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                if (areaInput) areaInput.focus();
            }, 700);
        });
    });

    // Optionally: Animate contact section cards when scroll in viewport (for modern effect)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('#contact-section .contact-gradient-card').forEach(card => observer.observe(card));
};
