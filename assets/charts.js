(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#2563eb';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#7c3aed';
  var ink = style.getPropertyValue('--ink').trim() || '#0f172a';
  var muted = style.getPropertyValue('--muted').trim() || '#64748b';
  var rule = style.getPropertyValue('--rule').trim() || '#e2e8f0';
  var bg2 = style.getPropertyValue('--bg2').trim() || '#ffffff';
  var success = '#059669';
  var warning = '#d97706';
  var danger = '#dc2626';

  var colorPalette = [accent, accent2, success, warning, danger, '#0891b2', '#db2777', '#65a30d'];

  // --- Chart: 高频词TOP15 ---
  var wordFreqEl = document.getElementById('chart-wordfreq');
  if (wordFreqEl) {
    var chart1 = echarts.init(wordFreqEl, null, { renderer: 'svg' });
    chart1.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { color: muted, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['伦理审查', '隐私保护', '开源', '人才培养', '算力', '供应链安全', '算法备案', '未成年人保护', '深度伪造', '合规监管', '具身智能', '智能体', '数据安全', '产业升级', '大模型', 'AI安全', '应用场景'],
        axisLabel: { color: ink, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: [3, 4, 3, 4, 6, 5, 5, 6, 6, 7, 7, 7, 9, 9, 10, 12, 15],
        itemStyle: {
          color: function(params) {
            var idx = params.dataIndex;
            if (idx >= 14) return accent;
            if (idx >= 10) return accent2;
            return accent + '99';
          },
          borderRadius: [0, 4, 4, 0]
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontSize: 11,
          fontWeight: 600
        }
      }]
    });
    window.addEventListener('resize', function() { chart1.resize(); });
  }

  // --- Chart: 政策领域分布饼图 ---
  var pieDomainEl = document.getElementById('chart-pie-domain');
  if (pieDomainEl) {
    var chart2 = echarts.init(pieDomainEl, null, { renderer: 'svg' });
    chart2.setOption({
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}项 ({d}%)' },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        textStyle: { color: ink, fontSize: 12 },
        itemGap: 12
      },
      color: colorPalette,
      series: [{
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: bg2, borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: ink }
        },
        data: [
          { value: 6, name: '应用场景' },
          { value: 3, name: '安全监管' },
          { value: 2, name: '科技创新' },
          { value: 2, name: '产业促进' },
          { value: 1, name: '标准制定' },
          { value: 1, name: '消费者保护' }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart2.resize(); });
  }

  // --- Chart: 政策发布时间分布 ---
  var timelineEl = document.getElementById('chart-timeline');
  if (timelineEl) {
    var chart3 = echarts.init(timelineEl, null, { renderer: 'svg' });
    chart3.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true },
      legend: {
        data: ['国内政策', '国外政策'],
        textStyle: { color: ink, fontSize: 12 },
        top: 0
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['7/1', '7/3', '7/7', '7/8', '7/9', '7/10', '7/11', '7/13', '7/14', '7/15'],
        axisLabel: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: { color: muted, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [
        {
          name: '国内政策',
          type: 'line',
          smooth: true,
          data: [0, 0, 2, 2, 2, 0, 1, 1, 1, 0],
          itemStyle: { color: accent },
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: accent + '40' }, { offset: 1, color: accent + '05' }] } },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 8
        },
        {
          name: '国外政策',
          type: 'line',
          smooth: true,
          data: [1, 1, 1, 0, 0, 1, 0, 0, 1, 0],
          itemStyle: { color: accent2 },
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: accent2 + '40' }, { offset: 1, color: accent2 + '05' }] } },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 8
        }
      ]
    });
    window.addEventListener('resize', function() { chart3.resize(); });
  }

  // --- Chart: 国内外政策数量对比 ---
  var compareEl = document.getElementById('chart-compare');
  if (compareEl) {
    var chart4 = echarts.init(compareEl, null, { renderer: 'svg' });
    chart4.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
      legend: {
        data: ['国家级', '地方级', '美洲', '欧洲', '亚洲'],
        textStyle: { color: ink, fontSize: 11 },
        top: 0
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '18%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['国内', '国外'],
        axisLabel: { color: ink, fontSize: 13, fontWeight: 600 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: { color: muted, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [
        { name: '国家级', type: 'bar', stack: 'domestic', data: [1, 0], itemStyle: { color: warning }, barWidth: '35%' },
        { name: '地方级', type: 'bar', stack: 'domestic', data: [8, 0], itemStyle: { color: success }, barWidth: '35%' },
        { name: '美洲', type: 'bar', stack: 'foreign', data: [0, 1], itemStyle: { color: danger }, barWidth: '35%' },
        { name: '欧洲', type: 'bar', stack: 'foreign', data: [0, 2], itemStyle: { color: accent }, barWidth: '35%' },
        { name: '亚洲', type: 'bar', stack: 'foreign', data: [0, 3], itemStyle: { color: accent2 }, barWidth: '35%' }
      ]
    });
    window.addEventListener('resize', function() { chart4.resize(); });
  }

  // --- Chart: 各省市AI政策数量分布 ---
  var regionalEl = document.getElementById('chart-regional');
  if (regionalEl) {
    var chart5 = echarts.init(regionalEl, null, { renderer: 'svg' });
    chart5.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
      xAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: { color: muted, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['深圳', '湖北', '浙江', '上海', '四川', '贵州'],
        axisLabel: { color: ink, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: [1, 1, 1, 1, 2, 2],
        itemStyle: {
          color: function(params) {
            var colors = [accent + '80', accent + '90', accent + '99', accent2 + '99', accent2, accent];
            return colors[params.dataIndex];
          },
          borderRadius: [0, 6, 6, 0]
        },
        barWidth: '50%',
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontSize: 12,
          fontWeight: 600,
          formatter: '{c}项'
        }
      }]
    });
    window.addEventListener('resize', function() { chart5.resize(); });
  }

  // --- Chart: 地方政策类型分布 ---
  var localTypeEl = document.getElementById('chart-localtype');
  if (localTypeEl) {
    var chart6 = echarts.init(localTypeEl, null, { renderer: 'svg' });
    chart6.setOption({
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}项 ({d}%)' },
      legend: {
        bottom: '0%',
        textStyle: { color: ink, fontSize: 11 },
        itemGap: 10
      },
      color: colorPalette,
      series: [{
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: bg2, borderWidth: 2 },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 11,
          color: ink
        },
        labelLine: { length: 10, length2: 10 },
        data: [
          { value: 3, name: '应用场景' },
          { value: 2, name: '科技攻关' },
          { value: 1, name: '安全监管' },
          { value: 1, name: '产业培育' },
          { value: 1, name: '专项资金' }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart6.resize(); });
  }

  // --- Chart: 全球AI政策重点领域雷达图 ---
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var chart7 = echarts.init(radarEl, null, { renderer: 'svg' });
    chart7.setOption({
      animation: false,
      tooltip: { appendToBody: true },
      legend: {
        data: ['中国', '美国', '欧盟', '亚洲其他'],
        textStyle: { color: ink, fontSize: 12 },
        top: 0
      },
      radar: {
        indicator: [
          { name: '产业应用', max: 10 },
          { name: '安全治理', max: 10 },
          { name: '技术创新', max: 10 },
          { name: '权益保护', max: 10 },
          { name: '标准制定', max: 10 },
          { name: '资金支持', max: 10 }
        ],
        shape: 'polygon',
        splitNumber: 5,
        axisName: { color: ink, fontSize: 12, fontWeight: 500 },
        splitLine: { lineStyle: { color: rule } },
        splitArea: { areaStyle: { color: [bg2, '#f8fafc'] } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9.5, 8, 9, 8.5, 6, 9],
            name: '中国',
            itemStyle: { color: accent },
            areaStyle: { color: accent + '30' },
            lineStyle: { width: 2 }
          },
          {
            value: [6, 7.5, 9, 9, 7, 5],
            name: '美国',
            itemStyle: { color: danger },
            areaStyle: { color: danger + '20' },
            lineStyle: { width: 2 }
          },
          {
            value: [5, 9.5, 6, 9, 8.5, 4],
            name: '欧盟',
            itemStyle: { color: accent2 },
            areaStyle: { color: accent2 + '25' },
            lineStyle: { width: 2 }
          },
          {
            value: [8, 6, 7, 6, 5, 8],
            name: '亚洲其他',
            itemStyle: { color: success },
            areaStyle: { color: success + '25' },
            lineStyle: { width: 2 }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart7.resize(); });
  }

  // --- Chart: 监管严格度变化趋势 ---
  var trendLineEl = document.getElementById('chart-trend-line');
  if (trendLineEl) {
    var chart8 = echarts.init(trendLineEl, null, { renderer: 'svg' });
    chart8.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true },
      legend: {
        data: ['中国监管严格度', '欧盟监管严格度', '美国监管严格度'],
        textStyle: { color: ink, fontSize: 12 },
        top: 0
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['2024年Q1', '2024年Q3', '2025年Q1', '2025年Q3', '2026年Q1', '2026年Q3(预测)'],
        axisLabel: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'value',
        max: 10,
        axisLabel: { color: muted, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [
        {
          name: '中国监管严格度',
          type: 'line',
          smooth: true,
          data: [4.5, 5.8, 7, 7.8, 8.5, 9],
          itemStyle: { color: accent },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 8,
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: accent + '25' }, { offset: 1, color: accent + '05' }] } }
        },
        {
          name: '欧盟监管严格度',
          type: 'line',
          smooth: true,
          data: [7, 8, 8.5, 8.8, 9.2, 9.5],
          itemStyle: { color: accent2 },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 8
        },
        {
          name: '美国监管严格度',
          type: 'line',
          smooth: true,
          data: [3, 3.5, 4, 5, 5.5, 6.5],
          itemStyle: { color: danger },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 8
        }
      ]
    });
    window.addEventListener('resize', function() { chart8.resize(); });
  }

})();
