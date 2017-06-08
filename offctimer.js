/**
 * 
 * test1.js
 * 
 * sidmishraw Modified: May 31, 2017 : 11:57:52 PM
 */

"use strict";

((function main() {

	$.noConflict();

	const TOTAL_WORK_HRS = 8;
	const BREAK_TIME_MINS = 30;
	const BREAK_TIME_AFTER_HRS = 4;

	jQuery("document")
	        .ready(
	                function() {

		                jQuery("#logintime")
		                        .unbind("change")
		                        .bind(
		                                "change",
		                                function(event) {

			                                let timeString =
			                                        jQuery(event.target).val();
			                                let parsedTime =
			                                        timeString
			                                                .match(/([0-9]+)\:([0-9]+)/i);
			                                let hrs = parsedTime[1];
			                                let mins = parsedTime[2];

			                                let scheduledtimes =
			                                        scheduleTimer(hrs, mins);

			                                // set the computed times
			                                jQuery("#lunchStart").html(
			                                        scheduledtimes[0]);
			                                jQuery("#lunchEnd").html(
			                                        scheduledtimes[1]);
			                                jQuery("#logout").html(
			                                        scheduledtimes[2]);
		                                });
	                });

	/**
	 * Schedules the lunch time and log out time for your input time. Computes a
	 * work hr of 8-hrs, including lunch clock off.
	 * 
	 * @param hrs
	 * @param mins
	 * @param amPm
	 * @returns the scheduled lunch times and end time
	 */
	function scheduleTimer(hrs, mins, amPm = "AM") {

		let scheduledTimes = [];

		hrs = parseInt(hrs);
		mins = parseInt(mins);

		if (amPm.toLowerCase() == "am") {

			let lunchStartHR = parseInt((hrs + BREAK_TIME_AFTER_HRS) % 12);

			lunchStartHR = (lunchStartHR == 0) ? 12 : lunchStartHR;

			// push lunch start time
			scheduledTimes
			        .push(`${("0" + lunchStartHR).slice(-2)}:${("0" + mins).slice(-2)}PM`);

			let lunchEndMINS = parseInt((mins + BREAK_TIME_MINS) % 60);

			let lunchEndHR =
			        parseInt((lunchStartHR + parseInt(mins + BREAK_TIME_MINS) / 60) % 12);

			lunchEndHR = (lunchEndHR == 0) ? 12 : lunchEndHR;

			scheduledTimes
			        .push(`${("0" + lunchEndHR).slice(-2)}:${("0" + lunchEndMINS).slice(-2)}PM`);

			let logoutHR =
			        parseInt((lunchEndHR + (TOTAL_WORK_HRS - BREAK_TIME_AFTER_HRS)) % 12);

			logoutHR = (logoutHR == 0) ? 12 : logoutHR;

			scheduledTimes
			        .push(`${("0" + logoutHR).slice(-2)}:${("0" + lunchEndMINS).slice(-2)}PM`);
		} else {

			alert("Ask manager for saving your arse!")
		}

		return scheduledTimes;
	}
})());
