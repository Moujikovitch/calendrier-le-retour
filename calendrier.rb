require 'sinatra'
require 'shotgun'
require 'sinatra/activerecord'

set :database,  "sqlite3:taskcalendars_db.sqlite3"

class TaskCalendar < ActiveRecord::Base
end

get '/' do
	@datas=TaskCalendar.all
	erb :index
end

post '/addtask' do
	TaskCalendar.create(params)
	redirect '/'
end