<?php
/*!
 * Locust
 * Copyright 2015 Jack Polgar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Locust\Models;

use Avalon\Database\Model;

/**
 * User model.
 */
class User extends Model
{
    protected static $_validates = [
        'username' => ['required'],
        'password' => ['required'],
        'email'    => ['required']
    ];

    /**
     * Authenticate the user.
     *
     * @param string $password
     *
     * @return boolean
     *
     * @todo Use bcrypt
     */
    public function authenticate($password)
    {
        return $this->password === $password;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        $data = $this->getData();
        unset($data['password'], $data['session_hash']);
        return $data;
    }
}
