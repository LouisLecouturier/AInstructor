from ninja import Schema, Router
from django.shortcuts import get_object_or_404
from app import models
import uuid as uuidLib
from typing import List
from pydantic import Field
import datetime
from django.db.models import Count, Sum, Avg, Min, Max
from django.core.exceptions import ObjectDoesNotExist

router = Router(tags=["statistic"])


class Stat(Schema):
    course_uuid: uuidLib.UUID
    theme: str = "theme"

@router.get("/user/{course}")
def get_user_stats_by_course(request, course: uuidLib.UUID):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    course = get_object_or_404(models.Course, uuid=course)
    if user:
        stat = get_object_or_404(models.UserStatistiques, user=user)
        return {'message': "successfully got the stats by course", "course": stat.course.uuid, "mean": stat.mean,
                "min": stat.min, "max": stat.max, "progress": stat.progress}


@router.post("/user")
def get_user_stats_by_theme(request, theme: str):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    
    if user and theme:
        try:
            stats = models.UserStatistiques.objects.filter(user=user, theme=theme).aggregate(Avg('mean'), Max('max'),
                                                                                             Min('min'))
            mean = stats['mean__avg']
            max = stats['max__max']
            min = stats['min__min']
            progress = models.UserStatistiques.objects.filter(user=user, theme=theme).aggregate(Avg('progress'))['progress__avg']
            return {'message': "successfully got the stats by subject", "theme": theme, "mean" :mean,
                    "min" :min,"max" :max, "progress" :progress}
        except ObjectDoesNotExist:
            return {'message': "user has no stats for this theme"}
    else:
        return {'message': "user or theme does not exist"}


class TeamStat(Schema):
    course_uuid: uuidLib.UUID
    team_uuid: uuidLib.UUID

# @router.get("/team/{teamUUID}/course/{courseUUID}")
# def get_team_stats_by_course(request, teamUUID: uuidLib.UUID, courseUUID: uuidLib.UUID):
#     print("get_team_stats_by_course")
#     print(teamUUID)
#     print(courseUUID)
#     token = request.headers.get('Authorization')
#     accessToken = token.split(' ')[1]
#     user = get_object_or_404(models.CustomUser, accessToken=accessToken)

#     course = get_object_or_404(models.Course, uuid=courseUUID)
#     team = get_object_or_404(models.Team, uuid=teamUUID)



    #if user and team and course:
        #if user in team.users.all():

            # try :
            #     stat = get_object_or_404(models.TeamStatistiques, team=team, course=course)
            #     return {
            #         'error' : False,
            #         'message': "successfully got the stats by course",
            #         "course": stat.course.uuid,
            #         "mean" :stat.mean,
            #         "median" :stat.median,
            #         "min" :stat.min,
            #         "max" :stat.max
            #     }
            # except :
            #     return {
            #         'error' : True,
            #         'message': "team has no stats for this course"
            #         }


#         else:
#             return {
#                 'error' : True,
#                 'message': "user is not in the team"
#                 }
#     else:
#         return {
#             'error' : True,
#             'message': "user or team or course does not exist"
#             }





def median_value(queryset, term):
    count = queryset.count()
    values = queryset.values_list(term, flat=True).order_by(term)
    if count % 2 == 1:
        return values[int(round(count/2))]
    else:
        return sum(values[count/2-1:count/2+1])/2.0

@router.post("/team/theme")
def get_team_stats_by_theme(request, body: TeamStat):

    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    course = get_object_or_404(models.Course, uuid=course_uuid)
    team = get_object_or_404(models.Team,uuid=team_uuid)
    if user and team and course and theme:
        if user in team.users.all():
            stat = models.TeamStatistiques.objects.filter(team=team,course = course,course__subject=theme).aggregate(Avg('mean'), Max('max'), Min('min'))
            mean = stat['mean__avg']
            max = stat['max__max']
            min = stat['min__min']
            medianQuery = models.TeamStatistiques.objects.filter(team=team,course = course,course__subject=theme)
            median = median_value(medianQuery, 'mean')

            return{'message': "successfully got the stats by subject", "theme": theme, "mean" :mean,"min" : min,"max" :max, "median" :median}
        else:
            return {'message': "user is not in the team"}
    else:
        return {'message': "user or team or course does not exist"}

@router.get("/course/{course}")
def getTeamsCOmparaison(request, course : uuidLib.UUID):
    print("getTeamsCOmparaison")
    course = get_object_or_404(models.Course, uuid=course)
    if course:
        teams = course.team.all()
        if teams:
            teamsStats = []
            for team in teams:
                teamStats = models.TeamStatistiques.objects.filter(team=team,course=course).aggregate(Avg('mean'), Max('max'), Min('min'))
                mean = teamStats['mean__avg']
                max = teamStats['max__max']
                min = teamStats['min__min']
                teamInfos = {
                    "uuid": team.uuid,
                    "name": team.name,
                }
                teamsStats.append({"team":teamInfos,"mean":mean,"max":max,"min":min})
            return {'message': "successfully got the stats by course", "course": course.uuid, "teamsStats":teamsStats}
        else:
            return {'message': "course has no teams", 'error' : True}



@router.get("/team/{teamUUID}/course/{courseUUID}")
def get_team_stats_by_course(request, teamUUID: uuidLib.UUID, courseUUID: uuidLib.UUID):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)

#     course = get_object_or_404(models.Course, uuid=courseUUID)
#     team = get_object_or_404(models.Team, uuid=teamUUID)



    usersStats = []
    users = team.users.all()

    print(users)

    for student in users:
        if not student.isTeacher:
            userInfos = {
                "id": student.id,
                "firstName": student.first_name,
                "lastName": student.last_name,
            }
            try :
                stat = get_object_or_404(models.UserStatistiques, user=student, course=course)
                print(stat)
                userstat = {
                    "mean": stat.mean,
                    "min": stat.min,
                    "max": stat.max,
                    "progress": stat.progress,
                }
                data = {
                    "user": userInfos,
                    "stats": userstat
                }
            except :
                data = {
                    "user": userInfos,
                    "stats": null
                }

            usersStats.append(data)




    if user and team and course:
        if user in team.users.all():
            try:
                stat = get_object_or_404(models.TeamStatistiques, team=team, course=course)
                return {
                    'error': False,
                    'message': "successfully got the stats by course",
                    "course": stat.course.uuid,
                    "mean": stat.mean,
                    "median": stat.median,
                    "min": stat.min,
                    "max": stat.max
                    "usersStats": usersStats,
                }
            except:
                return {
                    'error': True,
                    'message': "team has no stats for this course"
                }

        else:
            return {
                'error': True,
                'message': "user is not in the team"
            }
    else:
        return {
            'error': True,
            'message': "user or team or course does not exist"
            }
