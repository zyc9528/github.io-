/**
 * 乌市房地产市场 2025年深度研究报告（付费版） - 主脚本
 * 实现网站交互功能和主题切换
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initTheme();
    
    // 初始化交互功能
    initInteractions();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 优化房价涨幅展示
    enhancePriceIncreaseDisplay();
});

/**
 * 初始化主题设置
 */
function initTheme() {
    // 获取主题切换按钮
    const themeToggle = document.getElementById('theme-toggle');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    // 根据保存的设置或系统偏好设置主题
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // 添加主题切换事件
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // 切换暗色模式
            document.documentElement.classList.toggle('dark');
            
            // 保存设置到本地存储
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            // 重新渲染所有图表以适应新主题
            setTimeout(function() {
                if (window.createPriceIncreaseChart) window.createPriceIncreaseChart();
                if (window.createLandSupplyChart) window.createLandSupplyChart();
                if (window.createLandUsageChart) window.createLandUsageChart();
                
                // 重新初始化政策环境和投资策略图表
                const charts = document.querySelectorAll('.chart-container canvas');
                charts.forEach(chart => {
                    if (chart.chart) {
                        chart.chart.destroy();
                    }
                });
                
                // 触发重新加载图表
                const event = new Event('chartreload');
                document.dispatchEvent(event);
            }, 100);
        });
    }
}

/**
 * 初始化交互功能
 */
function initInteractions() {
    // 获取移动端菜单按钮和菜单
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // 添加菜单切换事件
    if (menuButton && mobileMenu) {
        // 使用触摸事件优化移动端体验
        const toggleMenu = function() {
            mobileMenu.classList.toggle('hidden');
            // 切换按钮图标
            const icon = menuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fas fa-bars';
                } else {
                    icon.className = 'fas fa-times';
                }
            }
            // 防止页面滚动
            if (!mobileMenu.classList.contains('hidden')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };
        
        // 添加点击和触摸事件
        menuButton.addEventListener('click', toggleMenu);
        menuButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMenu();
        });
        
        // 点击菜单项后关闭菜单
        const menuItems = mobileMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
                const icon = menuButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
        
        // 点击菜单外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !menuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
                const icon = menuButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
    
    // 平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 初始化滚动动画
 */
function initScrollAnimations() {
    // 获取所有需要动画的元素
    const fadeElements = document.querySelectorAll('.section-fade');
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加延迟，使动画更加平滑
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.dataset.delay || 0);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察每个元素，并添加不同的延迟
    fadeElements.forEach((element, index) => {
        // 为每个部分添加不同的延迟
        element.dataset.delay = index * 100;
        observer.observe(element);
    });
    
    // 添加滚动进度指示器
    addScrollProgressIndicator();
}

/**
 * 添加滚动进度指示器
 */
function addScrollProgressIndicator() {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollProgress + '%';
    });
}

/**
 * 优化房价涨幅展示
 */
function enhancePriceIncreaseDisplay() {
    // 获取房价涨幅展示容器
    const priceIncreaseContainer = document.querySelector('.price-increase-chart');
    
    // 如果容器不存在，创建新的容器
    if (!priceIncreaseContainer) {
        // 查找原始的房价涨幅展示区域
        const originalChart = document.querySelector('.my-8 .relative.overflow-hidden.rounded-lg');
        
        if (originalChart && originalChart.parentNode) {
            // 创建新的容器
            const newContainer = document.createElement('div');
            newContainer.className = 'price-increase-chart my-8';
            
            // 创建标题
            const title = document.createElement('h4');
            title.className = 'chart-title';
            title.textContent = '2025年乌市各区域房价预计涨幅';
            
            // 创建图表容器
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm';
            chartContainer.id = 'price-increase-chart';
            
            // 添加到DOM
            newContainer.appendChild(title);
            newContainer.appendChild(chartContainer);
            
            // 替换原始图表
            originalChart.parentNode.replaceChild(newContainer, originalChart);
            
            // 创建新的图表
            createPriceIncreaseChart();
        }
    }
}

/**
 * 创建房价涨幅图表
 */
window.createPriceIncreaseChart = function() {
    // 检查容器是否存在
    const container = document.getElementById('price-increase-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 房价涨幅数据
    const data = {
        labels: ['高新区', '经开区', '水磨沟区', '沙依巴克区', '其他区域'],
        datasets: [{
            label: '预计涨幅(%)',
            data: [6.8, 6.5, 5.0, 4.2, 3.5],
            backgroundColor: [
                'rgba(30, 64, 175, 0.9)',  // 深蓝色主色调
                'rgba(30, 64, 175, 0.8)',
                'rgba(30, 64, 175, 0.7)',
                'rgba(30, 64, 175, 0.6)',
                'rgba(30, 64, 175, 0.5)'
            ],
            borderColor: [
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)'
            ],
            borderWidth: 1,
            borderRadius: 4
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
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 5,
                    callbacks: {
                        label: function(context) {
                            return '预计涨幅: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}