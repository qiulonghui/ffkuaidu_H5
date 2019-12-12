import http from '@/utils/http'
// 文字合成语音
export function speechSynth({
	bgVoxId,
	bgVoxPath,
	bgVoxType,
	duration,
	ipAddress,
	isStatistics,
	openId,
	pitch,
	readerID,
	readerVolume,
	serialId,
	speed,
	title,
	ttsContent,
	unionId,
	volume,
	way
}) {
	const data = {
		bgVoxId,
		bgVoxPath,
		bgVoxType,
		duration,
		ipAddress,
		isStatistics,
		openId,
		pitch,
		readerID,
		readerVolume,
		serialId,
		speed,
		title,
		ttsContent,
		unionId,
		volume,
		way
	}
	return http({
		url: '/pc/api/synVox/speechSynth',
		method: 'post',
		data
	})
}

// 合成进度查询
export function queryProcess({
	serialId,
	type
}) {
	const params = {
		serialId,
		type
	}
	return http({
		url: `/pc/api/synVox/queryProcess`,
		method: 'get',
		params
	})
}
// 获取语音合成结果
export function getSynthResult({ serialId }) {
	const params = {
		serialId
	}
	return http({
		url: `/pc/api/synVox/querySynthResult`,
		method: 'get',
		params
	})
}