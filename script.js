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
    // Kết quả
    const resultsSection = document.getElementById('resultsSection');
    const estimatedCostDisplay = document.getElementById('estimatedCost');
    const costLoadingSpinner = document.getElementById('costLoadingSpinner');
    const costError = document.getElementById('costError');
    const ctxCostBreakdown = document.getElementById('costBreakdownChart').getContext('2d');

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
            // Lấy giá trị các select cho logic giá
            const style = styleSelect.value;
            const finish = finishSelect.value;
            const foundationType = foundationTypeSelect.value;
            const mezzanineOption = mezzanineOptionSelect.value;
            const rooftopOption = rooftopOptionSelect.value;
            const roofType = roofTypeSelect.value;

            let baseCostPerSqM = 5000000;
            if (style === 'neoclassical') baseCostPerSqM *= 1.2;
            else if (style === 'minimalist') baseCostPerSqM *= 0.95;
            if (finish === 'standard') baseCostPerSqM *= 1.15;
            else if (finish === 'premium') baseCostPerSqM *= 1.35;

            let floorFactor = 1;
            if (floors === 2) floorFactor = 1.05;
            else if (floors === 3) floorFactor = 1.1;
            else if (floors === 4) floorFactor = 1.15;
            else if (floors > 4) floorFactor = 1.2;

            let foundationFactor = 1;
            if (foundationType === 'strip') foundationFactor = 1.05;
            else if (foundationType === 'pile') foundationFactor = 1.10;

            let mezzanineFactor = (mezzanineOption === 'yes') ? 1.03 : 1;
            let rooftopFactor = (rooftopOption === 'yes') ? 1.02 : 1;
            let roofFactor = 1;
            if (roofType === 'thai') roofFactor = 1.05;
            else if (roofType === 'japanese') roofFactor = 1.07;

            const totalArea = area * floors;
            const totalEstimatedCost = totalArea * baseCostPerSqM * floorFactor * foundationFactor * mezzanineFactor * rooftopFactor * roofFactor;

            // Hiển thị kết quả
            estimatedCostDisplay.textContent = `${totalEstimatedCost.toLocaleString('vi-VN')} VNĐ`;

            const breakdownPercentages = {
                'basic':    { rough: 40, finishing: 30, me: 15, design: 10, contingency: 5 },
                'standard': { rough: 35, finishing: 35, me: 15, design: 10, contingency: 5 },
                'premium':  { rough: 30, finishing: 40, me: 15, design: 10, contingency: 5 }
            };
            const currentBreakdownPercents = breakdownPercentages[finish];

            costBreakdownChart.data.datasets[0].data = Object.values(currentBreakdownPercents);
            costBreakdownChart.update();

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
    document.querySelectorAll('#contact-section .content-card').forEach(card => observer.observe(card));
};
