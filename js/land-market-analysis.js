/**
 * 土地市场分析图表脚本
 * 用于创建和渲染土地市场分析相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化土地市场分析图表
    createLandPolicyChart();
    createLandQualityChart();
    createCommercialLandChart();
});

/**
 * 创建工业用地政策红利图表
 */
function createLandPolicyChart() {
    // 检查容器是否存在
    const container = document.getElementById('industrial-policy-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 工业用地政策红利数据
    const data = {
        labels: ['容积率上限', '企业所得税减免', '溢价率'],
        datasets: [{
            label: '政策红利指标',
            data: [3.0, 15, 0.6],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
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
            plugins: {
                legend: {
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
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            let value = context.parsed.y;
                            let suffix = '';
                            
                            if (context.dataIndex === 0) {
                                suffix = '倍';
                            } else if (context.dataIndex === 1) {
                                suffix = '%';
                            } else if (context.dataIndex === 2) {
                                suffix = '%';
                            }
                            
                            return label + ': ' + value + suffix;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            if (index === 0) return value + '倍';
                            if (index === 1) return value + '%';
                            if (index === 2) return value + '%';
                            return value;
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建住宅用地品质化转型图表
 */
function createLandQualityChart() {
    // 检查容器是否存在
    const container = document.getElementById('residential-quality-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 住宅用地品质化转型数据
    const data = {
        labels: ['普通住宅用地', '低密生态社区', '四代住宅'],
        datasets: [{
            label: '容积率',
            data: [2.5, 1.4, 2.0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
            ],
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
            plugins: {
                legend: {
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
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

/**
 * 创建商办用地困境与破局图表
 */
function createCommercialLandChart() {
    // 检查容器是否存在
    const container = document.getElementById('commercial-land-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 商办用地困境与破局数据
    const data = {
        labels: ['商务金融地块溢价率', '商业空置率', '商改租潜力'],
        datasets: [{
            label: '商办用地指标',
            data: [1.0, 30.0, 65.0],
            backgroundColor: [
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(75, 192, 192, 0.7)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)'
            ],
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
            plugins: {
                legend: {
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
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}