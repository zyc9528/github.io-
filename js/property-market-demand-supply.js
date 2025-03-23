/**
 * 商品房市场需求分层与供给优化图表脚本
 * 用于创建和渲染商品房市场需求分层与供给优化相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化商品房市场需求分层与供给优化图表
    createPropertyMarketDemandSupplyCharts();
});

/**
 * 初始化商品房市场需求分层与供给优化图表
 */
function createPropertyMarketDemandSupplyCharts() {
    // 创建住宅市场户型占比图表
    createResidentialTypeChart();
    
    // 创建工业地产租金增长图表
    createIndustrialRentGrowthChart();
    
    // 监听窗口大小变化，重新渲染图表
    window.addEventListener('resize', debounce(function() {
        createResidentialTypeChart();
        createIndustrialRentGrowthChart();
    }, 250));
}

/**
 * 创建住宅市场户型占比图表
 */
function createResidentialTypeChart() {
    // 检查容器是否存在
    const container = document.getElementById('residential-type-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 住宅市场户型占比数据
    const data = {
        labels: ['90㎡以下', '90-120㎡', '120-144㎡', '144㎡以上'],
        datasets: [{
            label: '户型占比',
            data: [42, 58, 22, 18],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)'
            ],
            borderColor: [
                'rgb(59, 130, 246)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)',
                'rgb(239, 68, 68)'
            ],
            borderWidth: 1
        }]
    };
    
    // 创建画布元素
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    // 绘制图表
    new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: window.innerWidth < 768 ? 6 : 10,
                    boxPadding: window.innerWidth < 768 ? 3 : 5,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '60%',
            radius: '90%'
        }
    });
}

/**
 * 创建工业地产租金增长图表
 */
function createIndustrialRentGrowthChart() {
    // 检查容器是否存在
    const container = document.getElementById('industrial-rent-growth-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 工业地产租金增长数据
    const data = {
        labels: ['临空经济区', '米东区', '高新区', '经开区', '头屯河区'],
        datasets: [{
            label: '租金年涨幅(%)',
            data: [8, 6.5, 5.8, 4.2, 3.5],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
        }]
    };
    
    // 创建画布元素
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    // 绘制图表
    new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: window.innerWidth < 768 ? 6 : 10,
                    boxPadding: window.innerWidth < 768 ? 3 : 5,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.x + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * 防抖函数
 * @param {Function} func 要执行的函数
 * @param {number} wait 延迟时间(毫秒)
 * @returns {Function} 防抖处理后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}